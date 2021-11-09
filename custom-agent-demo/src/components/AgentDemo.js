import React, { Component } from 'react'
import { Device, PlatformIcon, SmartConnectButton } from 'cobrowse-agent-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faDoorOpen, faPen, faPencilAlt, faHandPointer } from '@fortawesome/free-solid-svg-icons'
import CobrowseAPI from 'cobrowse-agent-sdk'
import Button from './Button'
import './AgentDemo.css'

const cobrowse = new CobrowseAPI()
let context = null

function arrayEquals(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    a = a.sort()
    b = b.sort()
  } else {
    return false
  }

  return a.length === b.length && a.every((val, index) => val === b[index])
}

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

  renderDevices () {
    const { devices } = this.state

    if (devices.length > 0) {
      return devices.map(device => {
        return (
          <div key={device.id} className='dvc-container' style={{ borderColor: device.online ? '#3cc56e' : '#eee' }}>
            <Device device={device}>
            <SmartConnectButton
              key={device.id}
              label={
                <div className='smartbtn-content'>
                  <PlatformIcon platform={device.device.platform} />
                  <span> Join</span>
                </div>
              }
              onClick={() => this.connect(device.id)}
              device={device}
            />
            </Device>
            {Object.keys(device.custom_data).map(key => (
              <div className='custom-data' key={key}>
                <b>{key}</b><span> = </span><code>{device.custom_data[key]}</code>
              </div>
            ))}
          </div>
        )
      })
    }

    return null
  }

  renderSession () {
    return (
      <div className='agent-session'>
        <iframe
          name={this.state.device_id}
          title='Agent Session'
          frameBorder={0}
          width='100%'
          height={520}
          src={`https://cobrowse.io/connect/device/${this.state.device_id}?token=${this.state.token}&end_action=none&agent_tools=none&device_controls=none&nochrome=true`}
        />
        <div className='btn-row row center-xs'>
          <Button onClick={() => context.setTool('laser')} className='column btn-left-most'>
            <FontAwesomeIcon icon={faPen} /><span> Point</span>
          </Button>
          <Button onClick={() => context.setTool('drawing')} className='column btn-middle'>
            <FontAwesomeIcon icon={faPencilAlt} /><span> Draw</span>
          </Button>
          <Button onClick={() => context.clearAnnotations()} className='column btn-middle'>
            <FontAwesomeIcon icon={faTrash} /><span> Erase</span>
          </Button>
          <Button onClick={() => context.setTool('control')} className='column btn-middle'>
            <FontAwesomeIcon icon={faHandPointer} /><span> Control</span>
          </Button>
          <Button onClick={() => context.endSession()} className='column btn-right-most btn-leave'>
            <FontAwesomeIcon icon={faDoorOpen} /><span> Leave</span>
          </Button>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='AgentDemo'>
        {
          this.state.device_id
            ? this.renderSession()
            : this.renderDevices()
        }
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

  async getDevices () {
    setTimeout(() => {
      if (!this.state.device_id && context === null) {
        this.getDevices()
      }
    }, 10000)

    const devices = await cobrowse.devices.list()
    const deviceIds = devices.map(device => device.id)
    const { devices: old } = this.state
    const oldIds = old.map(device => device.id)

    // If the device sets are the same, do nothing with the data.
    if (arrayEquals(deviceIds, oldIds)) return

    if (Array.isArray(devices)) {
      devices.forEach(device => {
        device.subscribe()
        device.on('updated', () => {
          this.setState({ state: this.state })
        })
      })
    }

    if (Array.isArray(old)) {
      old.forEach(device => {
        device.unsubscribe()
      })
    }

    this.setState({ devices })
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

  componentDidMount () {
    this.getDevices()
  }
}
