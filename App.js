import React from 'react';
import { StyleSheet } from 'react-native';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import datareducer from './reducers'
import mySaga from './sagas/mysaga'
import AppNavigation from './tabnavigation'
const sagaMiddleware=createSagaMiddleware()
const store=createStore(datareducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mySaga) 
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <AppNavigation /> 
      </Provider> 
    );
  }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
