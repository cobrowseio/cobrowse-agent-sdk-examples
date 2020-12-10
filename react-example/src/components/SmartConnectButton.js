import './SmartConnectButton.css';

export default function SmartConnectButton(props) {

    function onClick() {
        if (props.device.isConnectable() && props.onClick) props.onClick(props.device);
    }

    return (
        <div
            className={`SmartConnectButton ${props.device.isOnline()?'online':''} ${props.device.isConnectable()?'connectable':''}`}
            onClick={onClick}
        >Connect</div>
  );
}
