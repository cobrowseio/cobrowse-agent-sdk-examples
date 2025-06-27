import { SmartConnectButton, PlatformIcon, Device, Session, CodeEntry } from 'cobrowse-agent-ui'

function App(props) {

  return (
    <div className="App" style={{margin: 15}}>
      <h2>Smart Connect Buttons</h2>
      <p>These buttons change style and become clickable when a device comes online.</p>
      { props.devices.map(d => <SmartConnectButton key={d.id} onClick={props.connect} device={d} />) }
      <p>Customise button labels</p>
      { props.devices.map(d => <SmartConnectButton key={d.id} label={
        <div style={{display:'flex', alignItems:'center'}}>
          <PlatformIcon style={{width: 20, height: 20, marginLeft:0}} platform={d.device.platform} />
          <span style={{marginLeft:7}}>Join</span>
        </div>
        } onClick={props.connect} device={d} />)
      }

      <h2>Six Digit Code Entry</h2>
      <p>A component for accepting a screen share code.</p>
      <CodeEntry onCode={props.handleCode} />

      <h2>Device Listing</h2>
      <p>A list of devices whose details update in real time.</p>
      { props.devices.map(d => <Device key={d.id} device={d} connect={props.connect} /> )}

      <p>A device list with some customisation.</p>
      { props.devices.map(d => (
        <div key={d.id} style={{border:`2px solid ${d.online?'orange':'#eee'}`, borderRadius:5, marginTop: 7}}>
          <Device style={{border: '0px none', marginTop: 7}} device={d}>
            <button>Custom Button</button>
          </Device>
          { Object.keys(d.custom_data).map(key => (
            <div style={{display:'inline-block', margin: 4, padding: '3px 7px', fontSize:12, borderRadius:10, background:'#f3f3f3'}} key={key}>
              <b>{key}</b><span> = </span><code>{d.custom_data[key]}</code>
            </div>
          ))}
        </div>
      ))}

      <h2>Session Listing</h2>
      <p>A list of previous sessions.</p>
      { props.sessions.map(s => <Session key={s.id} session={s} onClick={() => props.openSession(s)} style={{cursor:'pointer'}} />)}

      <p>A session list with some customisation.</p>
      { props.sessions.map(s => (
        <div key={s.id} style={{borderRadius:5, marginTop: 7}}>
          <Session style={{border: '0px none', marginTop: 7}} onClick={() => props.openSession(s)} session={s} />
          { Object.keys(s.custom_data).map(key => (
            <div style={{display:'inline-block', margin: 4, padding: '3px 7px', fontSize:12, borderRadius:10, background:'#f3f3f3'}} key={key}>
              <b>{key}</b><span> = </span><code>{s.custom_data[key]}</code>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App
