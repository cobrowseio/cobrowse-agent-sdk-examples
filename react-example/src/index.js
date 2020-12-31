import CobrowseAPI from 'cobrowse-agent-sdk';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// create an API instance
const cobrowse = new CobrowseAPI();

async function fetchToken(demoid) {
    // !! WARNING READ THIS !!
    // You should NOT use this endpoint to get your own token. This endpoint is
    // specific to the cobrowse.io hosted online demo. It will not work with your
    // account and devices.
    // You should fetch a token in an authenticated way from your own server for
    // the user. See our documentation on generating a JWT for cobrowse:
    // https://docs.cobrowse.io/agent-side-integrations/custom-iframe-integrations/json-web-tokens-jwts
    if (!demoid) return;
    window.localStorage.cobrowse_demo_id = demoid;
    const res = await fetch(`${cobrowse.api}/api/1/demo/token?cobrowseio_demo_id=${demoid}`);
    const { token } = await res.json();
    cobrowse.token = token;
    await refresh();
}

async function refresh() {
    // list some devices to use in example UIs
    const [devices, sessions] = await Promise.all([
        cobrowse.devices.list(),
        cobrowse.sessions.list({state:['active', 'ended'], activated: new Date(0)})
    ]);

    // subscribe to updates for these resources
    devices.forEach(device => device.subscribe());
    // and sessions
    sessions.forEach(sessions => sessions.subscribe());

    // render the current state on any updates
    render(devices, sessions);
    devices.forEach(device => device.on('updated', () => render(devices, sessions)));
    sessions.forEach(session => session.on('updated', () => render(devices, sessions)));
}

function connect(device) {
    window.open(`${cobrowse.api}/connect/device/${device.id}?token=${cobrowse.token}&end_action=none`);
}

function openSession(session) {
    if (session.recorded && session.state === 'ended')
        window.open(`${cobrowse.api}/session/${session.id}/recording?token=${cobrowse.token}`);
    else window.open(`${cobrowse.api}/session/${session.id}?token=${cobrowse.token}`);
}

async function handleCode(code) {
    try {
        const session = await cobrowse.sessions.get(code);
        if (session) {
            openSession(session);
            return true;
        }
    } catch(e) {
        return false;
    }
}

function render(devices=[], sessions=[]) {
    ReactDOM.render(
        <React.StrictMode>
            <div className="options">
                Demo ID: <input onBlur={e => fetchToken(e.target.value)} defaultValue={window.localStorage.cobrowse_demo_id||''}/>
            </div>
            <App
                devices={devices.map(d => d.toJSON())}
                sessions={sessions.map(s => s.toJSON())}
                handleCode={handleCode}
                connect={connect}
                openSession={openSession}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

render();
fetchToken(window.localStorage.cobrowse_demo_id);
