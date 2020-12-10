import Device from './Device';
import './DeviceList.css';

export default function DeviceList(props) {

    function renderDevice(device, idx) {
        return (
            <div className={'row'} key={idx}>
                <Device device={device} />
            </div>
        );
    }

    return (
        <div className="DeviceList">
            { props.devices.map(renderDevice) }
        </div>
  );
}
