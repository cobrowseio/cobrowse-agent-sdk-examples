import { SmartConnectButton, DeviceList, CodeEntry } from 'cobrowse-agent-ui';

function App(props) {

    return (
        <div className="App" style={{margin: 15}}>
            <h2>Smart Connect Buttons</h2>
            <p>These buttons change style and become clickable when a device comes online.</p>
            { props.devices.map(d => <SmartConnectButton key={d.id} onClick={props.connect} device={d} />) }

            <h2>Device Listing</h2>
            <p>A list of devices whose details update in real time.</p>
            <DeviceList devices={props.devices} connect={props.connect} />

            <h2>Six Digit Code Entry</h2>
            <p>A component for accepting a screen share code.</p>
            <CodeEntry onCode={props.handleCode} />
        </div>
    );
}

export default App;
