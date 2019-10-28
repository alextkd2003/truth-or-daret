import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form, Button} from 'react-bootstrap';
import Swal from 'sweetalert2';

// redux
import {connect} from 'react-redux';
import {} from '../../actions/types'

const errors = {
  wrongUserQuantity: 'wrongUserQuantity'
}

class Home extends Component {

  state = {
    playerQuantity: 2,
    players: [],
    questionsByMacha: "true"
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
    this.props.changeGameView( 'game' );
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

export default connect(null, {})(Home);

Home.propTypes = {
  changeGameView: PropTypes.func.isRequired
}