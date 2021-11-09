import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faDoorOpen, faPen, faPencilAlt, faHandPointer, faGlobe } from '@fortawesome/free-solid-svg-icons'
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
      connect: false,
      device_id: null,
      devices: [],
      token: query.get('token')
    }
    this.sessionFrame = React.createRef()

    cobrowse.token = this.state.token
  }

  renderConnect () {
    return (
      <div className='btn-row btn-connect row center-xs'>
        <Button onClick={() => this.connect()}>
          <FontAwesomeIcon icon={faGlobe} /><span> Connect</span>
        </Button>
      </div>
    )
  }

  renderSession () {
    return (
      <div className='agent-session'>
        <iframe
          ref={this.sessionFrame}
          name={this.state.device_id}
          title='Agent Session'
          frameBorder={0}
          width='100%'
          height={520}
          src={`https://cobrowse.io/connect?filter_cobrowseio_demo_id=${this.state.demo_id}&token=${this.state.token}&end_action=none&agent_tools=none&device_controls=none&nochrome=true`}
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
          this.state.connect
            ? this.renderSession()
            : this.renderConnect()
        }
      </div>
    )
  }

  connect (deviceId) {
    this.setState({ connect: true })
  }

  disconnect () {
    this.setState({ connect: false })
    if (context) {
      context.destroy()
      context = null
    }
  }

  componentDidUpdate () {
    if (this.state.connect && context === null) {
      cobrowse.attachContext(this.sessionFrame.current).then(result => {
        context = result

        context.on('session.updated', (session) => {
          if (session.ended) this.disconnect()
        })
      })
    }
  }
}
