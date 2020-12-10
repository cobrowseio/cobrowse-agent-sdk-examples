import parser from 'ua-parser-js';
import moment from 'moment';
import './Device.css';

export default function Device(props) {

    function deviceType({ platform, device }) {
        switch (platform) {
            case 'web': {
                const ua = parser(device);
                return `${ua.browser.name} on ${ua.os.name}`;
            }
            case 'ios': return 'iOS Device';
            case 'android': return 'Android Device';
            case 'windows': return 'Windows Device';
            case 'macos': return 'Mac OS Device';
            default: return platform;
        }
    }

    return (
        <div className={`Device ${props.device.isOnline()?'online':''} ${props.device.isConnectable()?'connectable':''}`}>
            { deviceType(props.device.toJSON().device) }
            <div className={'last-seen'}>Last seen {moment(props.device.lastSeen()).fromNow()}</div>
        </div>
  );
}
