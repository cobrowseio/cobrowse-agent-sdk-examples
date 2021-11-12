import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPhone, faPen, faMarker, faDesktop, faHandPointer } from '@fortawesome/free-solid-svg-icons'
import CobrowseAPI from 'cobrowse-agent-sdk'
import Stopwatch from './components/Stopwatch'
import './CustomAgentUIExample.css'

const cobrowse = new CobrowseAPI()

export default function CustomAgentUIExample(props) {
  const [ session, setSession ] = useState(null)
  const [ tool, setTool ] = useState('laser')
  const [ context, setContext ] = useState()

  async function onIframeRef(iframe) {
    if ((!context) && iframe) {
      const ctx = await cobrowse.attachContext(iframe)
      ctx.on('session.updated', session => {
        // update the component session state
        setSession(session.toJSON())
        // when the session ends, trigger some cleanup of the context
        if (session.isEnded()) {
          ctx.destroy()
          setContext(null)
        }
      })
      setContext(ctx)
    }
  }

  function pickTool(tool) {
    setTool(tool)
    context?.setTool(tool)
  }

  function renderControls () {
    if (session?.state !== 'active') return null
    return (
      <div className='agent-controls'>
        <div className='timer'>
          <Stopwatch start={session.activated} />
        </div>
        <div onClick={() => pickTool('laser')} title={'Laser Pointer'} className={`btn btn-left-most ${tool === 'laser' ? 'btn-selected' : ''}`}>
          <FontAwesomeIcon icon={faPen} />
        </div>
        <div onClick={() => pickTool('drawing')} title={'Draw'} className={`btn ${tool === 'drawing' ? 'btn-selected' : ''}`}>
          <FontAwesomeIcon icon={faMarker} />
        </div>
        <div onClick={() => context.clearAnnotations()} title={'Clear Drawing'} className='btn'>
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div onClick={() => pickTool('control')} title={'Remote Control'} className={`btn ${tool === 'control' ? 'btn-selected' : ''}`}>
          <FontAwesomeIcon icon={faHandPointer} />
        </div>
        <div onClick={() => context.setFullDevice(!session.full_device)} title={'Full Device Mode'} className={`btn ${session.full_device ? 'full-device-on' : ''}`}>
          <FontAwesomeIcon icon={faDesktop} />
        </div>
        <div onClick={() => context.endSession()} title={'End Screenshare'} className='btn btn-right-most btn-end'>
          <FontAwesomeIcon icon={faPhone} className='fa-rotate-180' />
        </div>
      </div>
    )
  }

  if (session?.state === 'ended') return <div>The custom agent UI session has ended!</div>

  return (
    <div className='CustomAgentUIExample'>
      <div className='agent-session'>
        <iframe
          ref={onIframeRef}
          className={'screen'}
          title='Agent Session'
          frameBorder={0}
          src={`https://cobrowse.io/connect?filter_cobrowseio_demo_id=${props.demoId}&token=${props.token}&end_action=none&agent_tools=none&device_controls=none&nochrome=true&allow_popout=false`}
        />
        { renderControls() }
      </div>
    </div>
  )
}
