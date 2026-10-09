import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPhone, faPen, faMarker, faDesktop, faHandPointer } from '@fortawesome/free-solid-svg-icons'
import CobrowseAPI from 'cobrowse-agent-sdk'
import Stopwatch from './components/Stopwatch'
import ColorPicker from './components/ColorPicker'
import './CustomAgentUIExample.css'

const defaultColor = '#e94435'

export default function CustomAgentUIExample(props) {
  const [ session, setSession ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ tool, setTool ] = useState('laser')
  const [ colors, setColors ] = useState([])
  const [ color, setColor ] = useState()
  const [ context, setContext ] = useState()
  const [ screenInfo, setScreenInfo ] = useState()

  // we show some messages a few seconds after a timestamp, so
  // so we need for force renders to catch that
  useEffect(() => {
    const intervalId = setInterval(() => setScreenInfo({ ...screenInfo, time: Date.now() }), 500)
    return () => clearInterval(intervalId)
  }, [screenInfo])

  // the iframe may remember a color from a previous session, so pick one
  // of the session's allowed colors and push it to keep both UIs in sync
  useEffect(() => {
    if (!context || colors.length === 0 || colors.includes(color)) return

    const initialColor = colors.find((color) => color.toLowerCase() === defaultColor) ?? colors[0]

    setColor(initialColor)
    context.setColor(initialColor)
  }, [context, colors, color])

  useEffect(() => {
    if (session?.state === 'active') context?.setTool(tool)
  }, [context, session?.state, tool])

  async function onIframeRef(iframe) {
    if ((!context) && iframe) {
      const cobrowse = new CobrowseAPI(null, { api: props.api })
      const ctx = await cobrowse.attachContext(iframe)
      window.cobrowse_ctx = ctx
      ctx.on('session.updated', session => {
        // update the component session state
        setSession(session.toJSON())
        setColors(session.colors ?? [])
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

  function pickColor(color) {
    setColor(color)
    context?.setColor(color)
  }

  function renderError() {
    if (error) {
      return <div className={'error'}><b>Your custom error screen</b><p>id = {error.id}</p></div>
    }
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
        <div onClick={() => setTool('laser')} title={'Laser Pointer'} className={`btn btn-left-most ${tool === 'laser' ? 'btn-selected' : ''}`}>
          <FontAwesomeIcon icon={faPen} />
        </div>
        <div onClick={() => setTool('drawing')} title={'Draw'} className={`btn ${tool === 'drawing' ? 'btn-selected' : ''}`}>
          <FontAwesomeIcon icon={faMarker} />
        </div>
        { colors.length > 1 && <ColorPicker className='btn' colors={colors} selectedColor={color} onColorPicked={pickColor} /> }
        <div onClick={() => context.clearAnnotations()} title={'Clear Drawing'} className='btn'>
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div onClick={() => setTool('control')} title={'Remote Control'} className={`btn ${tool === 'control' ? 'btn-selected' : ''}`}>
          <FontAwesomeIcon icon={faHandPointer} />
        </div>
        <div onClick={() => context.setFullDevice(session.full_device === 'on' ? 'off' : 'requested')} title={'Full Device Mode'} className={`btn ${`full-device-${session.full_device}`}`}>
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
          src={`${props.api}/connect?filter_demo_id=${props.demoId}&token=${props.token}&end_action=none&agent_tools=none&device_controls=none&session_details=none&popout=none&messages=none`}
        />
        { renderControls() }
      </div>
    </div>
  )
}
