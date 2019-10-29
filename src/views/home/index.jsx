import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form, Button} from 'react-bootstrap';
import Swal from 'sweetalert2';
import uuid from 'uuid/v4';

// redux
import {connect} from 'react-redux';
import {setPlayers} from '../../actions/playersAction';

const errors = {
  wrongUserQuantity: 'wrongUserQuantity'
}

class Home extends Component {

  state = {
    playerQuantity: 2,
    players: [
      {name: 'Player 1', id: uuid()},
      {name: 'Player 2', id: uuid()}
    ],
    questionsByMacha: "true"
  }

  onChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  onSetPlayerQuantity = (e) => {
    if (e.target.value > 20 || e.target.value < 1) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'You need to enter a valid user quantity up to 20!'
      });
    } else {
      this.setState({
        ...this.state,
        playerQuantity: e.target.value
      });

      // creating players
      const newPlayersQuantity = e.target.value - this.state.playerQuantity;
      
    }
  }

  onNameChange = e => {
    const playerNameIndex = e.currentTarget.dataset.index;
    console.log(playerNameIndex);
    const newPlayer = {
      id: uuid(),
      name: e.currentTarget.value
    } 

    this.setState({
      ...this.state,
      players: this.state.players.map((player, index) => index === playerNameIndex ? newPlayer : player)
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.setPlayers(this.state.players);
    this.props.changeGameView( 'game' );
  }

  displayNameForm() {
    const namesFormArray = [];
    for (let i = 0; i < this.state.players.length; i++) {
      namesFormArray.push(
        <Form.Group key = {i} controlId="input-player-name">
          <Form.Control 
            type='text'
            data-index={i}
            placeholder="player name" 
            defaultValue={this.state.players[i].name}
            onChange={this.onNameChange}
          />
        </Form.Group>
      )
    }
    return namesFormArray;
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
        <Button variant="primary" type="submit">
          Start
        </Button>
      </Form>
      </>
    )
  }
}

export default connect(null, {setPlayers})(Home);

Home.propTypes = {
  changeGameView: PropTypes.func.isRequired
}