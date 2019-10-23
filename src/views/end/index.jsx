import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class End extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        <h1>End View</h1>
      </div>
    )
  }
}
