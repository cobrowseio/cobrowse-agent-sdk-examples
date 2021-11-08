import CobrowseAPI from 'cobrowse-agent-sdk'

async function fetchToken () {
  // !! WARNING READ THIS !!
  // You should NOT use this endpoint to get your own token. This endpoint is
  // specific to the cobrowse.io hosted online demo. It will not work with your
  // account and devices.
  // You should fetch a token in an authenticated way from your own server for
  // the user. See our documentation on generating a JWT for cobrowse:
  // https://docs.cobrowse.io/agent-side-integrations/custom-iframe-integrations/json-web-tokens-jwts
  const res = await fetch('https://cobrowse.io/api/1/demo/token?cobrowseio_demo_id=agent-sdk-example');
  const { token } = await res.json()
  return token
}

(async function () {
  const api = new CobrowseAPI(await fetchToken())
  const session = await api.sessions.create()
  session.subscribe()
  console.log('session code', session.code)
}())

// expose for usage in console
window.CobrowseAPI = CobrowseAPI
