import SmartConnectButton from './components/SmartConnectButton';
import DeviceList from './components/DeviceList';

function App(props) {

    function onConnectClick(device) {
        alert(`connect to ${device.id()}`);
    }

  return (
    <div className="App" style={{margin: 15}}>
        <h2>Smart Connect Buttons</h2>
        <p>These buttons change style and become clickable when a device comes online.</p>
        { props.devices.map(d => <SmartConnectButton key={d.id()} onClick={onConnectClick} device={d} />) }

        <h2>Device Listing</h2>
        <p>A list of devices whose details update in real time.</p>
        <DeviceList devices={props.devices} />

    </div>
  );
}

export default App;
