import moment from 'moment';
import './Device.css';

export default function Device(props) {

    return (
        <div className={`Device ${props.device.isOnline()?'online':''} ${props.device.isConnectable()?'connectable':''}`}>
            { props.device.id() }
            <div className={'last-seen'}>Last seen {moment(props.device.lastSeen()).fromNow()}</div>
        </div>
  );
}
