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

  changeGameView = view => {
    const gameViewValues = Object.values(gameView);
    console.log(gameViewValues);

    if (gameViewValues.includes(view)) {
      this.setState({
        ...this.state,
        activeGameView: view
      });        
    }
  }

  render() {

    return (
      <Container>
        <Row>
          <Col>
            {
              this.state.activeGameView === gameView.home ? 
                <Home changeGameView={this.changeGameView} /> : 
                this.state.activeGameView === gameView.game ? 
                  <Game changeGameView={this.changeGameView} /> : 
                  <End changeGameView={this.changeGameView} />
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
