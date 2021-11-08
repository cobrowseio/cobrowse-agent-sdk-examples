import React, { Component } from 'react'
import './SegmentedInput.css'

export default class SegmentedInput extends Component {
  static Option = class Option extends Component {
    render () {
      const props = { ...this.props }
      delete props.children
      return [
        <input key={this.props.id} {...props} type='radio' />,
        <label key={`${this.props.id}-label`} htmlFor={this.props.id}>{this.props.children}</label>
      ]
    }
  }

  render () {
    return (
      <div className={`SegmentedInput ${this.props.className || ''}`}>
        {this.props.children}
      </div>
    )
  }
}
