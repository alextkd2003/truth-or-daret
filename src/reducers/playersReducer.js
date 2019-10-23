import {
  SET_PLAYERS,
  ADD_PLAYER_POINT
} from '../actions/types';

const initialState ={
  players: []
}

export const playersReducer = (state=initialState, action) => {
  switch (action.type) {
    case SET_PLAYERS:
      return {
        ...state,
        players: action.payload
      }
    case ADD_PLAYER_POINT:
      return {
        ...state,
        players: state.players.map(player => player.id === action.payload ? {name: player.name, points: player.points + 1} : player)
      }
    default:
      return state;
  }
}