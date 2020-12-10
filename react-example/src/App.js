import SmartConnectButton from './components/SmartConnectButton';
import DeviceList from './components/DeviceList';
import CodeEntry from './components/CodeEntry';

function App(props) {

    function onConnectClick(device) {
        alert(`connect to ${device.id()}`);
    }

    async function validateCode(code) {
        return new Promise(function(resolve, reject) {
            setTimeout(() => resolve(0.5 < Math.random()));
        });
    }

    return (
        <div className="App" style={{margin: 15}}>
            <h2>Smart Connect Buttons</h2>
            <p>These buttons change style and become clickable when a device comes online.</p>
            { props.devices.map(d => <SmartConnectButton key={d.id()} onClick={onConnectClick} device={d} />) }

            <h2>Device Listing</h2>
            <p>A list of devices whose details update in real time.</p>
            <DeviceList devices={props.devices} />

            <h2>Six Digit Code Entry</h2>
            <p>A component for accepting a screen share code.</p>
            <CodeEntry validateCode={validateCode} />
        </div>
    );
}

export default App;
