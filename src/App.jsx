import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Home from './views/home';
import Game from './views/game';
import End from './views/end';

// react


const gameView = {
  home: 'home',
  game: 'game',
  end: 'end'
};
class App extends React.Component {

  state = {
    activeGameView: 'home'
  }

  render() {

    return (
      <Container>
        <Row>
          <Col>
            {
              this.state.activeGameView === gameView.home ? 
                <Home /> : 
                this.state.activeGameView === gameView.game ? 
                  <Game /> : 
                  <End />
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
