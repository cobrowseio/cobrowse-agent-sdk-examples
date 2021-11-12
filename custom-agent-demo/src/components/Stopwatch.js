import React, { Component } from 'react'
import moment from 'moment'

export default class Stopwatch extends Component {
  componentDidMount () {
    this.interval = setInterval(() => {
      this.forceUpdate()
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const start = moment(this.props.start || 0)
    const end = moment(this.props.end || Date.now())
    const ms = moment(end).diff(start)
    const delta = moment.duration(ms)
    return (
      <div style={this.props.style} className='Stopwatch'>
        {delta.hours() > 0 ? <span>{delta.hours()}<span>:</span></span> : null}
        <span>{moment.utc(ms).format('mm:ss')}</span>
      </div>
    )
  }
}
