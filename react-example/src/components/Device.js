import parser from 'ua-parser-js';
import moment from 'moment';
import SmartConnectButton from './SmartConnectButton';
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

    function deviceIcon(platform) {
        switch (platform) {
            case 'web': return require('../icons/web.svg').default;
            case 'ios': return require('../icons/apple.svg').default;
            case 'macos': return require('../icons/apple.svg').default;
            case 'android': return require('../icons/android.svg').default;
            case 'windows': return require('../icons/windows.svg').default;
            default: return require('../icons/default.svg').default;
        }
    }

    return (
        <div className={`Device ${props.device.online?'online':''} ${props.device.connectable?'connectable':''}`}>
            <img className={'platform-icon'} src={deviceIcon(props.device.device.platform)} alt={''}/>
            <div className={'details'}>
                { deviceType(props.device.device) }
                <div className={'last-seen'}>Last seen {moment(props.device.last_active).fromNow()}</div>
            </div>
            <SmartConnectButton device={props.device} onClick={props.connect} />
        </div>
  );
}
