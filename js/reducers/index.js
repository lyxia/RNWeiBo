import {combineReducers} from 'redux'
import {Login} from './Login'
import {Route} from './Route'
import {UnRead} from './UnRead'
import {Friend} from './Friend'

module.exports = combineReducers({
  Login,
  Route,
  UnRead,
  Friend,
})
