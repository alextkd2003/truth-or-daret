import {combineReducers} from 'redux';
import {gamePrefReducer} from './gamePrefReducer';
import {playersReducer} from './playersReducer';
import {questionsReducer} from './questionsReducer';

export default combineReducers({
  gamePref: gamePrefReducer,
  players: playersReducer,
  questions: questionsReducer
});