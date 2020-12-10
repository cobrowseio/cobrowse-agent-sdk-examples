import CobrowseAPI from 'cobrowse-agent-sdk';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// create an API instance
const cobrowse = new CobrowseAPI();

async function fetchToken(demoid) {
    // fetch a token for testing
    const res = await fetch(`${cobrowse.api}/api/1/demo/token?cobrowseio_demo_id=${demoid}`);
    const { token } = await res.json();
    return token;
}

async function onDemoId(demoid) {
    window.localStorage.cobrowse_demo_id = demoid;
    cobrowse.token = await fetchToken(demoid);
    await refresh();
}

async function refresh() {
    // list some sessions and devices to use in example UIs
    const devices = await cobrowse.devices.list();
    const sessions = await cobrowse.sessions.list();

    // subscribe to updates for these resources
    devices.forEach(device => device.subscribe());
    sessions.forEach(session => session.subscribe());

    // render the current state on any updates
    render(devices, sessions);
    devices.forEach(device => device.on('updated', () => render(devices, sessions)));
    sessions.forEach(session => session.on('updated', () => render(devices, sessions)));
}

function render(devices=[], sessions=[]) {
    ReactDOM.render(
        <React.StrictMode>
            <div className="options">
                Demo ID: <input onBlur={e => onDemoId(e.target.value)} defaultValue={window.localStorage.cobrowse_demo_id||''}/>
            </div>
            <App devices={devices} sessions={sessions} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

render();
onDemoId(window.localStorage.cobrowse_demo_id);
