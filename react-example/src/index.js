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
    const res = await fetch(`${cobrowse.api}/api/1/demo/token?cobrowseio_demo_id=${demoid}`);
    const { token } = await res.json();
    return token;
}

async function onDemoId(demoid) {
    if (!demoid) return;
    window.localStorage.cobrowse_demo_id = demoid;
    cobrowse.token = await fetchToken(demoid);
    await refresh();
}

async function refresh() {
    // list some devices to use in example UIs
    const devices = await cobrowse.devices.list();

    // subscribe to updates for these resources
    devices.forEach(device => device.subscribe());

    // render the current state on any updates
    render(devices);
    devices.forEach(device => device.on('updated', () => render(devices)));
}

async function handleCode(code) {
    try {
        const session = await cobrowse.sessions.get(code);
        if (session) {
            alert(`Load session ${session.id}`);
            return true;
        }
    } catch(e) {
        return false;
    }
}

function connect(device) {
    alert(`connect to ${device.id}`);
}

function render(devices=[]) {
    ReactDOM.render(
        <React.StrictMode>
            <div className="options">
                Demo ID: <input onBlur={e => onDemoId(e.target.value)} defaultValue={window.localStorage.cobrowse_demo_id||''}/>
            </div>
            <App
                devices={devices.map(d => d.toJSON())}
                handleCode={handleCode}
                connect={connect}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

render();
onDemoId(window.localStorage.cobrowse_demo_id);
