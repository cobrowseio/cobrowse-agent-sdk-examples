import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPhone, faPen, faMarker, faDesktop, faHandPointer } from '@fortawesome/free-solid-svg-icons'
import CobrowseAPI from 'cobrowse-agent-sdk'
import Stopwatch from './components/Stopwatch'
import './CustomAgentUIExample.css'

const cobrowse = new CobrowseAPI()

export default function CustomAgentUIExample(props) {
  const [ session, setSession ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ tool, setTool ] = useState('laser')
  const [ context, setContext ] = useState()
  const [ screenInfo, setScreenInfo ] = useState()

  // we show some messages a few seconds after a timestamp, so
  // so we need for force renders to catch that
  useEffect(() => {
    const intervalId = setInterval(() => setScreenInfo({ ...screenInfo, time: Date.now() }), 500)
    return () => clearInterval(intervalId)
  }, [screenInfo])

  async function onIframeRef(iframe) {
    if ((!context) && iframe) {
      const ctx = await cobrowse.attachContext(iframe)
      window.cobrowse_ctx = ctx
      ctx.on('session.updated', session => {
        // update the component session state
        setSession(session.toJSON())
        // when the session ends, trigger some cleanup of the context
        if (session.isEnded()) {
          ctx.destroy()
          setContext(null)
        }
      })
      ctx.on('screen.updated', info => {
        setScreenInfo(info)
      })
      ctx.on('error', err => {
        setError(err)
      })
      setContext(ctx)
    }
  }

  function pickTool(tool) {
    setTool(tool)
    context?.setTool(tool)
  }

  function renderError() {
    console.log(error)
    if (error) return <div className={'error'}><b>Your custom error screen</b><p>id = {error.id}</p></div>
    return null
  }

  function renderConnectingMessage() {
    if (!session || session?.state === 'pending') return <div className={'loading'}>Custom connecting to device message...</div>
    if (session?.state === 'authorizing') return <div className={'loading'}>Custom waiting for user to accept message...</div>
    if (!(screenInfo?.width)) return <div className={'loading'}>Custom loading loading video stream message...</div>
    return null
  }

  function renderTimeoutMessage() {
    if (session?.state === 'active' && screenInfo?.updated) {
      const updated = new Date(screenInfo?.updated)
      const delta = Date.now() - updated.getTime()
      if (delta > 10 * 1000) return <div className={'disconnected'}>Having trouble reaching the device!</div>
    }
    return null
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
        { renderError() }
        { renderConnectingMessage() }
        { renderTimeoutMessage() }
        <iframe
          ref={onIframeRef}
          className={'screen'}
          title='Agent Session'
          frameBorder={0}
          src={`${props.api}/connect?filter_cobrowseio_demo_id=${props.demoId}&token=${props.token}&end_action=none&agent_tools=none&device_controls=none&session_details=none&popout=none&messages=none`}
        />
        { renderControls() }
      </div>
    </div>
  )
}
