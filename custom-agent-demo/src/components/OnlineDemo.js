import React, { Component } from 'react'
import crypto from 'crypto'
import './OnlineDemo.css'

export default class OnlineDemo extends Component {
  constructor () {
    super()
    this.state = {
      token: null,
      demo_id: crypto.randomBytes(10).toString('hex')
    }
    this.devices = {}
  }

  componentDidMount () {
    this.startDemo()
  }

  async startDemo () {
    const token = await window.fetch(`https://cobrowse.io/api/1/demo/token?cobrowseio_demo_id=${this.state.demo_id}`).then(res => res.json())
    this.setState(token)
  }

  renderWeb () {
    const params = {
      cobrowseio_demo_id: this.state.demo_id,
      license: 'trial',
      api: 'https://cobrowse.io',
      device_name: 'Trial Website'
    }
    return (
      <div className='fake-window' style={{ display: 'block' }}>
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

  render () {
    return (
      <div className='OnlineDemo'>
        <div className={'row demo-view uncovered'}>
          {this.renderAgentView()}
          {this.renderCustomerView()}
        </div>
      </div>
    )
  }
}
