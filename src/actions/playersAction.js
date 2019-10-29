import {
  SET_PLAYERS,
  ADD_PLAYER_POINT
} from './types';

export const setPlayers = players => dispatch => {
  dispatch({
    type: SET_PLAYERS,
    payload: players
  });
}

export const addPlayerPoint = playerId => dispatch => {
  dispatch({
    type: ADD_PLAYER_POINT,
    payload: playerId
  });
}
