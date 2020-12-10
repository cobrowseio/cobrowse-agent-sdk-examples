import CobrowseAPI from 'cobrowse-agent-sdk';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function render(devices, sessions) {
    ReactDOM.render(
        <React.StrictMode>
            <App devices={devices} sessions={sessions} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

(async function() {
    // fetch a token for testing
    const ApiUrl = 'https://api.cobrowse.io';
    const res = await fetch(`${ApiUrl}/api/1/demo/token?cobrowseio_demo_id=examples`);
    const { token } = await res.json();

    // create an API instance
    const api = new CobrowseAPI(token, { api: ApiUrl });

    // list some sessions and devices to use in example UIs
    const devices = await api.devices.list();
    const sessions = await api.sessions.list();

    // subscribe to updates for these resources
    devices.forEach(device => device.subscribe());
    sessions.forEach(session => session.subscribe());

    // render the current state on any updates
    render(devices, sessions);
    devices.forEach(device => device.on('updated', () => render(devices, sessions)));
    sessions.forEach(session => session.on('updated', () => render(devices, sessions)));
})();
