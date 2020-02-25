import reducer, { initialState } from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleWare from 'redux-saga'
import rootSaga from './sagas'

export default function configureStore() {
  const enhancher = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const sagaMiddleWare = createSagaMiddleWare()
  const store = createStore(
    reducer,
    initialState,
    enhancher(applyMiddleware(sagaMiddleWare))
  )
  sagaMiddleWare.run(rootSaga)
  return store
}
