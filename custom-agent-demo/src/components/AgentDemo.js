import React, { Component } from 'react'
import { Device, PlatformIcon, SmartConnectButton } from 'cobrowse-agent-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faDoorOpen, faPen, faPencilAlt, faHandPointer } from '@fortawesome/free-solid-svg-icons'
import CobrowseAPI from 'cobrowse-agent-sdk'
import Button from './Button'
import './AgentDemo.css'

const cobrowse = new CobrowseAPI()
let context = null

export default class AgentDemo extends Component {
  constructor () {
    super()
    const query = new URLSearchParams(window.location.search)
    this.state = {
      demo_id: query.get('demo_id'),
      device_id: null,
      devices: [],
      token: query.get('token')
    }

    cobrowse.token = this.state.token
  }

  async getDevices () {
    const devices = await cobrowse.devices.list()

    if (Array.isArray(devices)) {
      devices.forEach(device => {
        device.subscribe()
        device.on('updated', () => {
          this.setState({ state: this.state })
        })
      })
    }

    this.setState({ devices })
  }

  renderDevices () {
    const { devices } = this.state

    if (devices.length > 0) {
      return devices.map(device => {
        return (
          <div key={device.id} style={{ border: `2px solid ${device.online ? '#3cc56e' : '#eee'}`, borderRadius: 5, marginTop: 7, marginLeft: 7, marginRight: 7 }}>
            <Device style={{border: '0px none', marginTop: 7}} device={device}>
            <SmartConnectButton
              key={device.id}
              label={
                <div style={{display:'flex', alignItems:'center'}}>
                  <PlatformIcon style={{width: 20, height: 20, marginLeft:0}} platform={device.device.platform} />
                  <span style={{marginLeft:7}}>Join</span>
                </div>
              }
              onClick={() => this.connect(device.id)}
              device={device}
            />
            </Device>
            { Object.keys(device.custom_data).map(key => (
              <div style={{ display: 'inline-block', margin: 4, padding: '3px 7px', fontSize: 12, borderRadius: 10, background:'#f3f3f3' }} key={key}>
                <b>{key}</b><span> = </span><code>{device.custom_data[key]}</code>
              </div>
            ))}
          </div>
        )
      })
    } else {
      this.getDevices()
    }

    return null
  }

  renderSession () {
    return (
      <div style={{ background: '#f7f7f7' }}>
        <iframe
          name={this.state.device_id}
          title='Agent Session'
          frameBorder={0}
          width='100%'
          height={520}
          src={`https://cobrowse.io/connect/device/${this.state.device_id}?token=${this.state.token}&end_action=none&agent_tools=none&device_controls=none&nochrome=true`}
        />
        <div className='AgentDemo row center-xs'>
          <Button onClick={() => context.setTool('laser')} className='column' style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
            <FontAwesomeIcon icon={faPen} /><span> Point</span>
          </Button>
          <Button onClick={() => context.setTool('drawing')} className='column' style={{ borderRadius: 0 }}>
            <FontAwesomeIcon icon={faPencilAlt} /><span> Draw</span>
          </Button>
          <Button onClick={() => context.clearAnnotations()} className='column' style={{ borderRadius: 0 }}>
            <FontAwesomeIcon icon={faTrash} /><span> Erase</span>
          </Button>
          <Button onClick={() => context.setTool('control')} className='column' style={{ borderRadius: 0 }}>
            <FontAwesomeIcon icon={faHandPointer} /><span> Control</span>
          </Button>
          <Button onClick={() => context.endSession()} className='column' style={{ background: '#de574d', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
            <FontAwesomeIcon icon={faDoorOpen} /><span> Leave</span>
          </Button>
        </div>
      </div>
    )
  }

  connect (deviceId) {
    this.setState({ device_id: deviceId })
  }

  disconnect () {
    this.setState({ device_id: null })
    if (context) {
      context.destroy()
      context = null
    }
  }

  render () {
    return (
      <div>
        {
          this.state.device_id
            ? this.renderSession()
            : this.renderDevices()
        }
      </div>
    )
  }

  componentDidUpdate () {
    if (this.state.device_id && context === null) {
      const iframe = document.querySelector(`[name="${this.state.device_id}"]`)

      cobrowse.attachContext(iframe).then(result => {
        context = result

        context.on('session.updated', (session) => {
          if (session.ended) this.disconnect()
        })
      })
    }
  }
}
