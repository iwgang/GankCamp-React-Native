import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store';
import RootPage from './RootPage';
import { DEBUG, RDEBUG } from './GlobalConst';

global.LOG = (msg) => {
	if (DEBUG) console.log(msg);
}

// Redux相关信息日志
global.RLOG = (msg) => {
	if (DEBUG && RDEBUG) console.log(msg);
}

const store = configureStore();

export default class App extends Component {
 
  render() {
    return (
	  <Provider store={store}>
	    <RootPage />
	  </Provider>
	);
  }

}
