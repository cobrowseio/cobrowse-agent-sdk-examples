import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const api = 'https://cobrowse.io'

async function fetchToken (demoid) {
  // !! WARNING READ THIS !!
  // You should NOT use this endpoint to get your own token. This endpoint is
  // specific to the cobrowse.io hosted online demo. It will not work with your
  // account and devices.
  // You should fetch a token in an authenticated way from your own server for
  // the user. See our documentation on generating a JWT for cobrowse:
  // https://docs.cobrowse.io/agent-side-integrations/custom-iframe-integrations/json-web-tokens-jwts
  if (!demoid) return
  window.localStorage.cobrowse_demo_id = demoid
  const res = await fetch(`${api}/api/1/demo/token?cobrowseio_demo_id=${demoid}`)
  const { token } = await res.json()
  return token
}


function render (token, demoId, api) {
  ReactDOM.render(
    <React.StrictMode>
      <App token={token} demoId={demoId} api={api} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

;(async function() {
  const demoId = Date.now()*Math.random()
  const token = await fetchToken(demoId)
  render(token, demoId, api)
})()
