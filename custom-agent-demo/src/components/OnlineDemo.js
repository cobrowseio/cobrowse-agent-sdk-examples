import React, { Component } from 'react'
import crypto from 'crypto'
import Button from './Button'
import './OnlineDemo.css'

export default class OnlineDemo extends Component {
  constructor () {
    super()
    this.state = {
      platform: 'web',
      token: null,
      started: false,
      demo_id: crypto.randomBytes(10).toString('hex')
    }
    this.devices = {}
  }

  componentDidMount () {
    if (this.props.started) this.startDemo()
    window.addEventListener('message', this.handlePostMessage, false)
  }

  setPlatform = (platform) => {
    this.setState({ platform })
  }

  handlePostMessage = (event) => {
    if (event.data === 'firstFrameReceived') {
      this.refreshDevicesWithRetry()
    }
  }

  async startDemo () {
    const token = await window.fetch(`https://cobrowse.io/api/1/demo/token?cobrowseio_demo_id=${this.state.demo_id}`).then(res => res.json())
    this.setState(token)
    this.setPlatform('web')
    this.setState({ started: true })
  }

  isStarted () {
    return (this.props.started || this.state.started)
  }

  refreshDevices = () => {
    if (!this.agent) return
    if (!this.agent.contentWindow) return
    if (!this.agent.contentWindow.document) return
    const refresh = this.agent.contentWindow.document.querySelector('.icon-cw')
    if (refresh) refresh.click()
  }

  refreshDevicesWithRetry = () => {
    setTimeout(this.refreshDevices, 1500)
    setTimeout(this.refreshDevices, 3500)
  }

  renderWeb () {
    const active = this.state.platform === 'web'
    if (active) this.webWasActive = true
    if (!this.webWasActive) return null
    const params = {
      cobrowseio_demo_id: this.state.demo_id,
      license: 'trial',
      api: 'https://cobrowse.io',
      device_name: 'Trial Website'
    }
    return (
      <div className='fake-window' style={{ display: active ? 'block' : 'none' }}>
        <div className='window-chrome'>
          <div className='window-chrome-buttons' />
          <div className='window-chrome-address' />
        </div>
        <iframe
          ref={el => { this.devices.web = el }}
          className='device web'
          title='Device'
          frameBorder={0}
          width={380}
          height={600}
          onLoad={this.refreshDevicesWithRetry}
          src={`https://cobrowse.io/todomvc/index.html?cobrowseio_demo_id=${params.cobrowseio_demo_id}&device_name=Web%20Trial%20Device&license=${params.license}&api=${params.api}`}
        />
      </div>
    )
  }

  renderCustomerView () {
    return (
      <div className='customer-view middle-xs col-sm-5 col-xs-12'>
        <h2>Your Customer</h2>
        {this.renderWeb()}
      </div>
    )
  }

  renderAgentView () {
    return (
      <div className='agent-view col-sm-7 col-xs-12'>
        <h2>Your Support Agent</h2>
        <div className='fake-window'>
          <div className='window-chrome'>
            <div className='window-chrome-buttons' />
            <div className='window-chrome-address' />
          </div>
          {this.state.token
            ? <iframe
                ref={a => { this.agent = a }}
                title='Agent'
                frameBorder={0}
                width='100%'
                height={600}
                src={`/agent_demo?token=${this.state.token}&demo_id=${this.state.demo_id}`}
              />
            : null}
        </div>
      </div>
    )
  }

  renderDemo () {
    return (
      <div className={`row demo-view ${this.isStarted() ? 'uncovered' : 'covered'}`}>
        {this.renderAgentView()}
        {this.renderCustomerView()}
      </div>
    )
  }

  render () {
    return (
      <div className='OnlineDemo'>
        {this.isStarted()
          ? null
          : (
            <div className='init-demo'>
              <h1>Online Demo</h1>
              <p>Explore the different ways to use Cobrowse, directly in your browser.</p>
              <Button className='start-demo' onClick={() => this.startDemo()}>Start Demo</Button>
            </div>
            )}
        {this.renderDemo()}
      </div>
    )
  }
}
