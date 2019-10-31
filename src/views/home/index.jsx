import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form, Button} from 'react-bootstrap';
import Swal from 'sweetalert2';
import uuid from 'uuid/v4';
import './styles.scss';

// redux
import {connect} from 'react-redux';
import {setPlayers} from '../../actions/playersAction';
import {setMachaQuestions} from '../../actions/gameConfAction';

const initialState = {
  playerQuantity: 1,
  players: [{
    name: 'Player 1',
    id: uuid()
  }],
  questionsByMacha: "true"
}

class Home extends Component {

  state = initialState;

  onSetPlayerQuantity = e => {
    if (e.target.value > 20 || e.target.value < 1) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'You need to enter a valid user quantity up to 20!'
      });
    } else {
      // creating players
      const quantityToAddDelete = e.target.value - this.state.playerQuantity;
      let tempPlayerArray = [...this.state.players];

      if (quantityToAddDelete !== 0) {
        if (quantityToAddDelete > 0) { // add new players
          for (let i = (tempPlayerArray.length); i < e.target.value; i++) {
            const newPlayer = {
              name: 'Player ' + (i + 1),
              id: uuid()
            }
            tempPlayerArray.push(newPlayer);
            console.log(tempPlayerArray);
          }
        } else {
          const quantityToDelete = this.state.playerQuantity - e.target.value;
          console.log(quantityToDelete);
          tempPlayerArray.splice(tempPlayerArray.length - quantityToDelete, tempPlayerArray.length);
        }
        this.setState({
          ...this.state,
          playerQuantity: e.target.value,
          players: tempPlayerArray
        });
      }
    }
  }

  onChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  onChangePlayerName = e => {
    const playerIndex = e.target.dataset.index;

    this.setState({
      ...this.state,
      players: this.state.players.map((player, index) => index === parseInt(playerIndex) ? {
        id: player.id,
        name: e.target.value,
      } : player)
    });
  }

  displayNameForm() {
    const namesFormArray = [];

    this.state.players.forEach((player, index) => {
      namesFormArray.push(
        <Form.Group key = {index} controlId="input-player-name">
          <Form.Control 
            type='text'
            placeholder="player name"
            data-index={index} 
            defaultValue={player.name}
            onChange={this.onChangePlayerName}
          />
        </Form.Group>
      )
    });
    return namesFormArray;
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.setPlayers(this.state.players);
    this.props.setMachaQuestions(this.state.questionsByMacha);
    this.props.changeGameView( 'game' );
  }

  render() {
    return (
      <>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="playerQuantity">
          <Form.Label>Player Quantity</Form.Label>
          <Form.Control 
            type="number" 
            value={this.state.playerQuantity}
            name="playerQuantity"
            onChange={this.onSetPlayerQuantity}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control as="select" name="questionsByMacha" onChange={this.onChange}>
            <option value={true}>Macha will give u the questions</option>
            <option value={false}>Player will ask</option>
          </Form.Control>
        </Form.Group>
        {this.displayNameForm()}
        <Form.Group>
          {
            this.state.playerQuantity > 0 ? 
              <Button variant="primary" type="submit" className="mx-2">
                Start
              </Button> :
            null
          }
        </Form.Group>
      </Form>
      </>
    )
  }
}

export default connect(null, {setPlayers, setMachaQuestions})(Home);

Home.propTypes = {
  changeGameView: PropTypes.func.isRequired
}