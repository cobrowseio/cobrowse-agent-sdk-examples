import React, { Component } from 'react'
import './AgentDemo.css'

export default class AgentDemo extends Component {
  render () {
    const query = new URLSearchParams(window.location.search)
    return (
      <div>
        <iframe
          ref={a => { this.agent = a }}
          title='Agent'
          frameBorder={0}
          width='100%'
          height={520}
          src={`https://cobrowse.io/dashboard?filter_cobrowseio_demo_id=${query.get('demo_id')}&token=${query.get('token')}`}
        />
      </div>
    )
  }
}
