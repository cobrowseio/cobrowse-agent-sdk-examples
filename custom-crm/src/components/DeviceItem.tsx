import { FC, useEffect, useRef } from 'react'
import { Device } from 'cobrowse-agent-sdk'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faMobileScreen, faComputer } from '@fortawesome/free-solid-svg-icons'
import { faApple, faAndroid, faWindows } from '@fortawesome/free-brands-svg-icons'

interface DeviceItemProps {
    item: Device;
    token: string;
    onDeviceUpdate: (updatedDevice: Device) => void;
}

const DeviceItem: FC<DeviceItemProps> = ({ item, token, onDeviceUpdate }) => {
    const deviceRef = useRef<Device>(item);

    useEffect(() => {
        const updateDevice = (updatedDevice: Device) => {
            deviceRef.current = updatedDevice;
            onDeviceUpdate(updatedDevice);
        };

        item.subscribe();
        item.on('updated', updateDevice);
        
        return () => {
            item.off('updated', updateDevice);
            item.unsubscribe();
        };
    }, [item]);

    let getDeviceName = (device: Device): String => {
        return device.custom_data.user_name ??
            device.custom_data.user_email ??
            device.custom_data.user_id ??
            device.custom_data.device_name ??
            `Unkown device : ${device.id.slice(0, 4)}`
    }

    const connectToDevice = (device: Device) => {
        const connectUrl = `https://cobrowse.io/connect/device/${device.id}?token=${token}&end_action=none`;
        window.open(connectUrl, '_blank');
    }

    const iconForDevice = (device: Device) => {
        switch (device.device.platform) {
            case 'ios':
            case 'macos':
                return faApple;
            case 'windows':
                return faWindows;
            case 'android':
                return faAndroid;
            case 'web':
                return faGlobe;
            default:
                return faComputer;
        }
    }

    return (
        <li className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
            <div className="h-10 bg-gray-200 rounded-full aspect-square flex items-center">
                <FontAwesomeIcon icon={iconForDevice(deviceRef.current)} className="text-white h-6 w-6 mx-auto px-2" />
            </div>
            <div className="flex-grow truncate">{getDeviceName(deviceRef.current)}</div>
            {deviceRef.current.connectable && (
                <button className=" bg-blue-500 text-white py-2 px-4 rounded" onClick={() => connectToDevice(deviceRef.current)}>
                    <FontAwesomeIcon icon={faMobileScreen} />
                </button>
            )}
        </li>
    );
    
};

export default DeviceItem;
