import React, { Component } from 'react'
import PropTypes from 'prop-types';

//redux
import {connect} from 'react-redux';
import {fetchQuestions} from '../../actions/questionsAction';

class Game extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    questions: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchQuestions();
  }

  render() {
    return (
      <div>
        <h1>Game View</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
  players: state.players.players
});

export default connect(mapStateToProps, {fetchQuestions})(Game);