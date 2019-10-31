import {
  SET_MACHA_QUESTIONS
} from './types';

export const setMachaQuestions = confirmation => {
  return dispatch => {
    dispatch({
      type: SET_MACHA_QUESTIONS,
      payload: confirmation
    })
  }
}