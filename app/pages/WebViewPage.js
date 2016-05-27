/**
 * 统一WebView页面
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component, PropTypes } from 'react';
import { View, WebView, Platform } from 'react-native';
import { connect } from 'react-redux';

import CustomTitleBarComp from '../comp/CustomTitleBarComp';
import HorizontalProgressComp from '../comp/HorizontalProgressComp';
import { showToast } from '../comp/CommonComp';
import CommonLoadView from '../comp/CommonLoadView';
import { collectStatusAction, addCollectAction, removeCollectAction } from '../actions/collect';
import { TITLE_BAR_HEIGHT } from '../GlobalConst';


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
    this.addCollect = this._addCollect.bind(this);
    this.canGoBack = false;

    this.state = {
      loadEnd: false,
    }
  }

  componentDidMount() {
    this.context.addBackButtonListener(this.onBackButton);
    this.props.dispatch(collectStatusAction(this.props.url));
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
          rightText={this.props.isCollect ? '取消收藏' : '收藏'}
          onRightBtnClick={this.addCollect}
          />
      );
    }
    let horizontalProgress;
    if (!this.state.loadEnd) {
      horizontalProgress = (
        <HorizontalProgressComp 
          color={'#FF5000'} 
          progress={60}
          style={{position: 'absolute', left: 0, right: 0, top: TITLE_BAR_HEIGHT + (Platform.OS === 'android' ? 18 : 20)}}
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
          onLoadEnd={() => this.setState({loadEnd: true})}
          // startInLoadingState={true}
          // renderLoading={() => <CommonLoadView loadState="ing" />}
          renderError={() => <CommonLoadView loadState="error" onRetry={() => this.refs.webView.reload()} />}
          onNavigationStateChange={this.onNavigationStateChange}
          />
        {horizontalProgress}
      </View>
    );
  }

  _addCollect() {
    if (this.props.isCollect) {
      showToast('成功取消收藏');
      this.props.dispatch(removeCollectAction(this.props.url));
    } else {
      showToast('收藏成功');
      this.props.dispatch(addCollectAction(this.props.title !== undefined ? this.props.title : this.props.url, this.props.url));
    }
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


function select(store) {
  return {
    isCollect: store.collectStore.isCollect,
  }
}

export default connect(select)(WebViewPage);