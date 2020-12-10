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
            case 'web': return 'https://image.flaticon.com/icons/svg/25/25240.svg';
            case 'ios': return 'https://image.flaticon.com/icons/svg/152/152752.svg';
            case 'android': return 'https://image.flaticon.com/icons/svg/38/38002.svg';
            case 'windows': return 'https://image.flaticon.com/icons/svg/732/732076.svg';
            default: return 'https://image.flaticon.com/icons/svg/80/80932.svg';
        }
    }

    return (
        <div className={`Device ${props.device.isOnline()?'online':''} ${props.device.isConnectable()?'connectable':''}`}>
            <img className={'platform-icon'} src={deviceIcon(props.device.toJSON().device.platform)} alt={''}/>
            <div className={'details'}>
                { deviceType(props.device.toJSON().device) }
                <div className={'last-seen'}>Last seen {moment(props.device.lastSeen()).fromNow()}</div>
            </div>
            <SmartConnectButton device={props.device} />
        </div>
  );
}
