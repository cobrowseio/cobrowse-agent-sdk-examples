#!/usr/bin/env node
import CobrowseAPI from 'cobrowse-agent-sdk'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import fsPromises from 'fs/promises'
import { pipeline } from 'stream'
import { promisify } from 'util'

// change these parameters to match your deployment
const API = 'https://cobrowse.io'
const email = 'your@email.com'
const licenseKey = 'yourlicensekeyhere'
const downloadPath = './recordings'

// Generate a JWT to access the API
// IMPORTANT: You should of course generate your own private key
//            and store it securely. This is an example only and
//            shoud not be used for production use cases!
const privateKey = fs.readFileSync('./private.pem')
const token = jwt.sign({
  displayName: email,
  role: 'administrator'
}, privateKey, {
  expiresIn: '1h',
  issuer: licenseKey,
  subject: email,
  audience: 'https://cobrowse.io',
  algorithm: 'RS256'
})

// Initialise the Cobrowse Agent SDK
const cobrowse = new CobrowseAPI(token, { api: API })

// Simple function to check if a file exists
async function exists (path) {
  try {
    await fsPromises.stat(path)
    return true
  } catch (e) {
    if (e.code === 'ENOENT') return false
    return true
  }
}

// Fetch all ended sessions since start
async function * listSessions (from) {
  let sessions = []
  do {
    const last = sessions[sessions.length - 1]
    sessions = await cobrowse.sessions.list({
      agent: 'all',
      state: 'ended',
      activated_after: from.toISOString(),
      activated_before: last?.activated || new Date().toISOString(),
      limit: 1000
    })
    for (const session of sessions) yield session
  } while (sessions.length)
}

// Loop through the fetched sessions and download the recordings
// for each if they have not already been downloaded.
async function download ({ from, prefix }) {
  for await (const session of listSessions(from)) {
    process.stdout.write(`Downloading ${session.id}... `)

    if (!session.recorded) {
      console.log('not recorded... skipping')
      continue
    }

    const path = `${prefix}/${session.id}`
    // skip any recordings that have already been downloaded
    if (await exists(path)) {
      console.log('already downloaded... skipping')
      continue
    }

    try {
      // start the download of the various recording components
      const recording = await session.recording()
      const [video, events] = await Promise.all([recording.video.fetch(), recording.events()])
      process.stdout.write('writing files... ')
      await fsPromises.mkdir(path, { recursive: true })
      // generate an appropriate file extensions
      const ext = video.headers.get('Content-Type')?.match(/video\/([a-z0-9]+).*/i)?.[1] || 'mp4'
      // download the video data if it was a video content type
      if (ext) await promisify(pipeline)(video.body, fs.createWriteStream(`${path}/video.${ext}`))
      // save the event json data that contains annotations and other updates
      await fsPromises.writeFile(`${path}/session.json`, JSON.stringify(session, null, '  '))
      // save the session json data as well
      await fsPromises.writeFile(`${path}/events.json`, JSON.stringify(events, null, '  '))
      console.log('success')
    } catch (e) {
      console.log('FAILED')
      // delete any partial recording downloads
      console.log('Cleaning up failed download', path, 'due to error', e.message)
      await fsPromises.rm(path, { recursive: true })
    }
  }
}

// Dowload recordings for the past 7 days
download({
  from: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
  prefix: downloadPath
}).catch(e => { console.error(e); process.exit(1) })
