import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { DateTime } from 'luxon'
import './Timer.css'

export default class Timer extends Component {
  constructor() {
    super();
    this.state = {
      started: false,
      runnng: false,
      time: DateTime.now()
    };
  }

  formatDuration () {
    if (!this.state.started) return '0:00'
    
    const diff = DateTime.now().diff(this.state.time) // this.state.time.diffNow()

    return diff.toFormat('m:ss', { floor: true })
  }

  refreshTime () {
    setTimeout(() => {
      if (this.props.start && this.state.runnng) this.setState({ state: this.state })

      if (this.props.start && !this.state.runnng) {
        this.setState({
          started: true,
          runnng: true,
          time: DateTime.now()
        })
      }
  
      if (!this.props.start && this.state.runnng) {
        this.setState({
          started: false,
          runnng: false
        })
      }

      this.refreshTime()
    }, 1000)
  }

  render () {
    return (
      <div className='Timer'>
        <FontAwesomeIcon icon={faClock} /><span className='time'>{this.formatDuration()}</span>
      </div>
    )
  }

  componentDidMount () {
    this.refreshTime()
  }
}
