import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Game extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        <h1>Game View</h1>
      </div>
    )
  }
}
