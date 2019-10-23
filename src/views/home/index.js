import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form, Button} from 'react-bootstrap';
import Swal from 'sweetalert2';

const errors = {
  wrongUserQuantity: 'wrongUserQuantity'
}

export default class Home extends Component {

  state = {
    playerQuantity: 2,
    players: [],
    error: false
  }

  onChange = (e) => {
    if (e.target.value > 20 || e.target.value < 1) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'You need to enter a valid user quantity up to 20!'
      });

    } else {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value
      })
    }
  }

  onSubmit = e => {
    e.preventDefault();
  }

  displayNameForm() {
    const namesFormArray = [];
    for (let i = 0; i < this.state.playerQuantity; i++) {
      namesFormArray.push(
        <Form.Group key = {i} controlId="input-player-name">
          <Form.Control 
            type='text' 
            placeholder="player name" 
            defaultValue={'Player ' + (i + 1)}
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
            onChange={this.onChange}
          />
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
