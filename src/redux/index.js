import {createStore, combineReducers} from 'redux'

import sidebar from './sidebar'

const create = () => {
  const reducers = combineReducers({
    sidebar,
  })
  const store = createStore(reducers)
  return store
}

export default create