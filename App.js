import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider, connect } from 'react-redux';
import config from './src/config';
import App from './src';
import { theme } from './src/core/theme';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { AppRegistry } from 'react-native';
import reducers from './src/reducers';


export default class Main extends React.Component {

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </PaperProvider>
    );
  }
}
AppRegistry.registerComponent('drffg', () => Main);
