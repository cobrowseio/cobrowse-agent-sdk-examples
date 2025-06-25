import './FakeWindow.css'

export default function FakeWindow(props) {
  return (
    <div className='FakeWindow' style={props.style}>
      <div className='window-chrome'>
        <div className='window-chrome-buttons' />
        <div className='window-chrome-address' />
        { props.children }
      </div>
    </div>
  )
}
