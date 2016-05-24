/**
 * 统一WebView页面
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component, PropTypes } from 'react';
import { View, WebView } from 'react-native';
import CustomTitleBarComp from '../comp/CustomTitleBarComp';
import { showToast } from '../comp/CommonComp';
import CommonLoadView from '../comp/CommonLoadView';


class WebViewPage extends Component {

  static defaultProps = {
    hideTitleBar: false,
  };

  static propTypes = {
    isHideTitleBar: PropTypes.bool, // 是否隐藏标题栏
  };

  static contextTypes = {
    addBackButtonListener: PropTypes.func,
    removeBackButtonListener: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.onNavigationStateChange = this._onNavigationStateChange.bind(this);
    this.onBackButton = this._onBackButton.bind(this);
    this.canGoBack = false;
  }

  componentDidMount() {
    this.context.addBackButtonListener(this.onBackButton);
  }

  componentWillUnmount() {
    this.context.removeBackButtonListener(this.onBackButton);
  }

  render() {
    let titleBar;
    if (!this.props.hideTitleBar) {
      titleBar = (
        <CustomTitleBarComp 
          title={this.props.title} 
          onLeftBtnClick={() => this.props.navigator.pop()} 
          rightText="分享"
          onRightBtnClick={() => showToast('分享：' + this.props.title)}
          />
      );
    }
    return (
      <View style={{flex: 1}}>
        {titleBar}
        <WebView 
          ref="webView"
          source={{uri: this.props.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          renderLoading={() => <CommonLoadView loadState="ing" />}
          renderError={() => <CommonLoadView loadState="error" onRetry={() => this.refs.webView.reload()} />}
          onNavigationStateChange={this.onNavigationStateChange}
          />
      </View>
    );

  }

  _onNavigationStateChange(navState) {
    this.canGoBack = navState.canGoBack;
  }

  _onBackButton() {
    if (this.canGoBack) {
      this.refs.webView.goBack();
      return true;
    }
    return false;
  }
  
}


export default WebViewPage;