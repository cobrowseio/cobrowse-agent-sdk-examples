#!/usr/bin/env node
import CobrowseAPI from 'cobrowse-agent-sdk'
import jwt from 'jsonwebtoken'
import fs from 'fs'

// Change these parameters to match your deployment
const API = 'https://cobrowse.io'
const email = 'your@email.com'
const licenseKey = 'yourlicensekeyhere'

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

// Loop through the fetched sessions and delete the recordings
async function deleteRecordings ({ from }) {
  for await (const session of listSessions(from)) {
    process.stdout.write(`Deleting ${session.id}... `)

    if (!session.recorded) {
      console.log('not recorded... skipping')
      continue
    }

    try {
      // Start the deletion of the recording
      const recording = await session.recording()
      await recording.destroy()
    } catch (e) {
      console.log('FAILED', e)
    }
  }
}

// Delete recordings for the past 7 days
deleteRecordings({
  from: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000))
}).catch(e => { console.error(e); process.exit(1) })
