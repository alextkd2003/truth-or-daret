import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form, Button} from 'react-bootstrap';
import Swal from 'sweetalert2';
import uuid from 'uuid/v4';
import './styles.scss';

// redux
import {connect} from 'react-redux';
import {setPlayers} from '../../actions/playersAction';

const errors = {
  wrongUserQuantity: 'wrongUserQuantity'
}

const initialState = {
  playerQuantity: 0,
  players: [],
  questionsByMacha: "true"
}

class Home extends Component {

  state = initialState;

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
      // creating players
      const newPlayersQuantity = e.target.value - this.state.playerQuantity;
      let newPlayerArray = [...this.state.players];

      if (newPlayersQuantity > 0) {
        console.log(this.state.playerQuantity, this.state.playerQuantity + newPlayersQuantity);
        for (let i = this.state.playerQuantity; i < this.state.playerQuantity + newPlayersQuantity; i++) {
          const newPlayer = {
            name: 'Player ' + (i+1),
            id: uuid()
          }
          newPlayerArray.push(newPlayer);
          console.log(newPlayerArray);
        }
        this.setState({
          ...this.state,
          players: newPlayerArray
        });
      } else {
        newPlayerArray.slice(newPlayersQuantity, newPlayerArray.length);
        this.setState({
          ...this.state,
          players: newPlayerArray
        });
      }
      this.setState({
        ...this.state,
        playerQuantity: e.target.value
      });
    }
  }

  onNameChange = e => {
    console.log('here');
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
        <Form.Group>
          {
            this.state.playerQuantity > 0 ? 
              <Button variant="primary" type="submit" className="mx-2">
                Start
              </Button> :
            null
          }
          <Button variant="primary" type="reset" className="mx-2">
            Reset
          </Button>
        </Form.Group>
      </Form>
      </>
    )
  }
}

export default connect(null, {setPlayers})(Home);

Home.propTypes = {
  changeGameView: PropTypes.func.isRequired
}