#!/usr/bin/env node
import fetch from 'node-fetch'
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

// generate a JWT to access the API
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

// recursively fetch all ended sessions since start
async function listSessions (from, accumulator = []) {
  const last = accumulator[accumulator.length - 1]
  const end = last?.activated || new Date().toISOString()
  const res = await fetch(`${API}/api/1/sessions?agent=all&state=ended&activated_after=${from.toISOString()}&activated_before=${end}&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error(`Failed to fetch sessions: ${await res.text()}`)
  const sessions = await res.json()
  if (sessions.length === 0) return accumulator
  return listSessions(from, [...accumulator, ...sessions])
}

// download the constituent parts of the recording
async function downloadRecording (session) {
  // download the recording metadata
  const recordingRes = await fetch(`${API}/api/1/sessions/${session.id}/recording`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!recordingRes.ok) throw new Error(`Failed to fetch recording: ${await recordingRes.text()}`)
  const recording = await recordingRes.json()

  // fetch the agent actions from the link in the metadata
  const actionsRes = await fetch(`${API}${recording.actions}`)
  if (!actionsRes.ok) throw new Error(`Failed to fetch actions: ${await actionsRes.text()}`)

  // fetch the video (if there is one) using the link in the metadata
  const videoRes = await fetch(`${API}${recording.video}`)
  if (!videoRes.ok) throw new Error(`Failed to fetch video: ${await videoRes.text()}`)
  return { session, recording, actions: actionsRes.body, video: videoRes.body }
}

async function saveRecording (path, data) {
  await Promise.all([
    promisify(pipeline)(data.actions, fs.createWriteStream(`${path}/actions.json`)),
    promisify(pipeline)(data.video, fs.createWriteStream(`${path}/video.mp4`)),
    fsPromises.writeFile(`${path}/session.json`, JSON.stringify(data.session, null, '  ')),
    fsPromises.writeFile(`${path}/events.json`, JSON.stringify(data.recording.events, null, '  '))
  ])
}

async function exists (path) {
  try {
    await fsPromises.stat(path)
    return true
  } catch (e) {
    if (e.code === 'ENOENT') return false
    return true
  }
}

async function download ({ from, prefix }) {
  const sessions = await listSessions(from)
  console.log(`Found ${sessions.length} sessions`)
  for (const session of sessions) {
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
      await fsPromises.mkdir(path, { recursive: true })
      const data = await downloadRecording(session)
      process.stdout.write('writing files... ')
      await saveRecording(path, data)
      console.log('success')
    } catch (e) {
      console.log('FAILED')
      // delete any partial recording downloads
      console.log('Cleaning up failed download', path, 'due to error', e.message)
      await fsPromises.rm(path, { recursive: true })
    }
  }
}

// dowload recordings for the past 7 days
download({
  from: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
  prefix: downloadPath
}).catch(e => { console.error(e); process.exit(1) })
