import React, { useState, useEffect } from 'react';
import CobrowseAPI, { Device } from 'cobrowse-agent-sdk';
import DeviceItem from './components/DeviceItem';
import SixDigitInput from './components/SixDigitInput';
import DashboardSkeleton from './components/skeletons/DashboardSkeleton';
import ContactSkeleton from './components/skeletons/ContactSkeleton';
import TabSkeleton from './components/skeletons/TabSkeleton';
import SidebarSkeleton from './components/skeletons/SidebarSkeleton';
import ListSkeleton from './components/skeletons/ListSkeleton';

const token = '<AGENT_JWT_TOKEN>';
const cobrowse = new CobrowseAPI();
cobrowse.token = token;

function App() {

  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    const fetchedDevices = await cobrowse.devices.list();

    var devices = fetchedDevices;
    const knownEmails: string[] = ['']; // Add known email if you wish to filter devices by email

    if (knownEmails.length > 0) {
      devices = fetchedDevices.filter((device) =>
        knownEmails.includes(device.custom_data.user_email)
      );
    }

    const sortedDevices = sortDevicesByConnectableStatus(devices);
    setDevices(sortedDevices);
  };

  const sortDevicesByConnectableStatus = (devices: Device[]) => {
    return devices.sort((a, b) =>
      a.connectable === b.connectable ? 0 : a.connectable ? -1 : 1
    );
  };

  const handleDeviceUpdate = (updatedDevice: Device) => {
    const index = devices.findIndex((device) => device.id === updatedDevice.id);

    const updatedDevices = [
      ...devices.slice(0, index),
      updatedDevice,
      ...devices.slice(index + 1),
    ];

    const sortedDevices = sortDevicesByConnectableStatus(updatedDevices);

    setDevices(sortedDevices);
  };

  const handleSixDigitsEntered = async (code: string) => {
    try {
      const session = await cobrowse.sessions.get(code);

      const url = `https://cobrowse.io/session/${session.id}?token=${token}&end_action=none`;
      window.open(url, '_blank');
      resetInput(false);
    } catch {
      resetInput(true);
    }
  };

  const resetInput = (isError: boolean) => {
    setResetKey((prevKey) => ({ key: prevKey.key + 1, isError }));
  };

  const [resetKey, setResetKey] = useState({ key: 0, isError: false });
  return (
    <div className="flex h-screen">
      <div className="w-full flex flex-col">
        <div className="flex flex-col lg:flex-row justify-center">
          <div className="lg:w-3/5 m-6">
            <DashboardSkeleton />
            <h1 className='text-lg text-gray-500 font-bold pb-2'>Previous cases</h1>
            <div className="flex gap-4">
              <ListSkeleton />
              <ListSkeleton />
              <ListSkeleton />
            </div>
          </div>
          <div className="lg:w-1/3 flex flex-col h-screen p-6">
            <ContactSkeleton />
            <TabSkeleton />
            <SidebarSkeleton />
            <h1 className='text-lg text-gray-500 font-bold pb-2'>Cobrowse</h1>
            <SixDigitInput
              resetKey={resetKey}
              onSixDigitsEntered={handleSixDigitsEntered}
              onReset={resetInput}
            />
            <div className="overflow-y-auto flex-grow mt-3 mb-3 min-h-[150px]">
              {devices.length > 0 ? (
                <ul className="grid grid-cols-1 gap-4">
                  {devices.map((device) => (
                    <DeviceItem key={device.id} item={device} token={token} onDeviceUpdate={handleDeviceUpdate} />
                  ))}
                </ul>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p>No devices</p>
                </div>
              )}
            </div>
            <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded" onClick={fetchDevices}>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;