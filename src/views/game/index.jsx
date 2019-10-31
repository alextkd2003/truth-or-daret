import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Spinner, Button} from 'react-bootstrap';

//redux
import {connect} from 'react-redux';
import {fetchQuestions} from '../../actions/questionsAction';

const gameStates = {
  continueWithMacha: 'continueWithMacha',
  continueWithOutMacha: 'continueWithOutMacha',
  truth: 'game',
  daret: 'daret',
  punishment: 'punishment'
}

class Game extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    questions: PropTypes.object
  }

  state = {
    playerIndex: 0,
    currentGameState: gameStates.presentation,
    continueWithOutMacha: false
  }

  componentDidMount() {
    this.props.fetchQuestions();
    if (this.props.gamePref.questionsByMacha === 'false') {
      this.setState({
        ...this.state,
        continueWithOutMacha: true
      })
    }
  }

  stateMachine = gameState => {
    if (this.props.questions.loading) {
      return <Spinner animation="border" />
    }
    if (this.props.questions.error) {
      return (
        <>
          <p>Error to load questions</p>
          <p>you can continue but macha will not help you whit questions :(</p>
          <Button
            onClick={() => this.setState({...this.state, continueWithOutMacha: true })}
          >Do you like to continue?</Button>
          <Button
            onClick={() => this.props.changeGameView('home')}
          >Exit</Button>
        </>
      )
    } 
    switch (gameState) {
      case gameStates.presentation:
        if (!this.state.continueWithOutMacha) {
          return
        }
        return (
          <h3>aaaa</h3>
        )
    
      default:
        break;
    }

  }


  render() {
    return (
      <div>
        <h1>Truth or Daret Game</h1>
        <Button>Truth</Button>
        <Button>Dare</Button>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  gamePref: state.gamePref,
  questions: state.questions,
  players: state.players.players
});

export default connect(mapStateToProps, {fetchQuestions})(Game);