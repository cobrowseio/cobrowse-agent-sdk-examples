import React, { Component } from 'react'
import './Button.css'

export default class Button extends Component {
  render () {
    return (
      <button disabled={this.props.disabled} style={this.props.style} className={`Button ${this.props.className || ''} ${this.props.rounded ? 'rounded' : ''}`} onClick={this.props.onClick}>
        {this.props.children}
        {this.props.thinking ? <span className='thinking'><span className='icon-spin2 animate-spin' /></span> : null}
      </button>
    )
  }
}
