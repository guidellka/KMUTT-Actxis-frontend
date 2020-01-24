import {createStore, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import login from './login'
import sidebar from './sidebar'


const create = () => {
  const reducers = combineReducers({
    login,sidebar,
  })
  const store = createStore(reducers, composeWithDevTools())
  return store
}

export default create