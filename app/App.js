import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store';
import RootPage from './RootPage';
import SplashPage from './SplashPage';
import { DEBUG, RDEBUG } from './GlobalConst';

global.LOG = (msg) => {
	if (DEBUG) console.log(msg);
}

// Redux相关信息日志
global.RLOG = (msg) => {
	if (DEBUG && RDEBUG) console.log(msg);
}

const store = configureStore();


class App extends Component {

	 constructor(props) {
    super(props);

    this.state = {
      isShowSplash: true,
    };
  }
 
  render() {
  	if (this.state.isShowSplash) {
  		return <SplashPage onAnimEnd={() => this.setState({isShowSplash: false})} />;
  	} else {
	    return (
			  <Provider store={store}>
			    <RootPage />
			  </Provider>
			);
  	}
  }

}


export default App;
