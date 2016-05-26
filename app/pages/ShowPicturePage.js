/**
 * 查看图片首页 (目前没有找到好点的第三方库来作两个端的图片显示，并且可以手势放大缩小的，所以先用WebView凑合先)
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, WebView, Dimensions, Platform } from 'react-native';
import CustomTitleBarComp from '../comp/CustomTitleBarComp';
import CommonLoadView from '../comp/CommonLoadView';
import RNTouchImageView from '../comp/TouchImageComp';


class ShowPicturePage extends Component {

  constructor(props) {
    super(props);
  
    this.exitPage = this._exitPage.bind(this);
  }

  static propTypes = {
    picUrl: PropTypes.string.isRequired,
  };

  render() {
    let contentView;
    if (Platform.OS === 'android') {
      contentView = (
        <RNTouchImageView 
          src={this.props.picUrl}
          style={{height: Dimensions.get('window').height}}
          onClick={this.exitPage}
          />
      );
    } else {
      contentView = (
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
      );
    }


    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        {contentView}
        <CustomTitleBarComp 
          titleBarStyle={styles.titleBarStyle}
          onLeftBtnClick={this.exitPage}
          />
      </View>
    );
  }

  _exitPage() {
    this.props.navigator.pop();
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