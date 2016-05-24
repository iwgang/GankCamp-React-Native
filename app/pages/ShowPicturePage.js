/**
 * 查看图片首页 (目前没有找到好点的第三方库来作两个端的图片显示，并且可以手势放大缩小的，所以先用WebView凑合先)
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import CustomTitleBarComp from '../comp/CustomTitleBarComp';
import CommonLoadView from '../comp/CommonLoadView';


class ShowPicturePage extends Component {

  static propTypes = {
    picUrl: PropTypes.string.isRequired,
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <WebView 
          ref="webView"
          source={{uri: this.props.picUrl}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          scalesPageToFit={true}
          renderLoading={() => <CommonLoadView loadState="ing" />}
          renderError={() => <CommonLoadView loadState="error" onRetry={() => this.refs.webView.reload()} />} 
          />
        <CustomTitleBarComp 
          titleBarStyle={styles.titleBarStyle}
          onLeftBtnClick={() => this.props.navigator.pop()}
          />
      </View>
    );

  }

}


const styles = StyleSheet.create({
  titleBarStyle: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)'
  },
});

export default ShowPicturePage;