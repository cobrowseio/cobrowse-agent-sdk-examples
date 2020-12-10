import './DeviceList.css';

export default function DeviceList(props) {

    return (
        <div className="DeviceList">
            <pre>{JSON.stringify(props.devices, null, '\t')}</pre>
        </div>
  );
}
