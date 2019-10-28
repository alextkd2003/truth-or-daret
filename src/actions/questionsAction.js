import {
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_ERROR
} from './types';
import axios from 'axios';


export const fetchQuestions = () => {
  return dispatch => {
    dispatch({
      type: FETCH_QUESTIONS
    });
    axios.get('http://macha.aleeli.us/wp-json/wp/v2/quiz')
      .then(res => {
        console.log(res);
        dispatch({
          type: FETCH_QUESTIONS_SUCCESS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: FETCH_QUESTIONS_ERROR,
          payload: err
        })
      });
  }
};
