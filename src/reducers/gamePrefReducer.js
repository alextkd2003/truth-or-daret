import {
  SET_MACHA_QUESTIONS
} from '../actions/types'

const initialState ={
  questionsByMacha: 'true'
}

export const gamePrefReducer = (state=initialState, action) => {
  switch (action.type) {
    case SET_MACHA_QUESTIONS:
      return {
        ...state,
        questionsByMacha: action.payload
      }
    default:
      return state;
  }
}