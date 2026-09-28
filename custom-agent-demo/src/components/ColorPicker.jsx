import { useState, useEffect, useRef } from 'react'
import './ColorPicker.css'

export default function ColorPicker(props) {
  const [ open, setOpen ] = useState(false)
  const ref = useRef()

  useEffect(() => {
    if (!open) return

    const close = () => setOpen(false)
    const closeIfOutside = (e) => !ref.current?.contains(e.target) && close()

    document.addEventListener('mousedown', closeIfOutside)
    window.addEventListener('blur', close)

    return () => {
      document.removeEventListener('mousedown', closeIfOutside)
      window.removeEventListener('blur', close)
    }
  }, [open])

  function pickColor(e, color) {
    e.stopPropagation()
    setOpen(false)
    props.onColorPicked(color)
  }

  return (
    <div ref={ref} onClick={() => setOpen(!open)} title='Annotation Color' className={`ColorPicker ${props.className}`}>
      <div className='swatch current' style={{ background: props.selectedColor }} />
      { open && (
        <div className='menu'>
          { props.colors.map(color => (
            <div
              key={color}
              onClick={(e) => pickColor(e, color)}
              title={color}
              className={`swatch ${color === props.selectedColor ? 'swatch-selected' : ''}`}
              style={{ background: color }}
            />
          )) }
        </div>
      ) }
    </div>
  )
}
