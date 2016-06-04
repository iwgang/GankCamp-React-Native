/**
 * 关于页面
 * Created by iWgang on 16/05/23.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import WebViewPage from './WebViewPage';
import CustomTitleBarComp from '../comp/CustomTitleBarComp';
import { COMMON_BACKGROUND_COLOR, APP_VERSION } from '../GlobalConst';


class AboutPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <CustomTitleBarComp 
          title="关于" 
          onLeftBtnClick={() => this.props.navigator.pop()} 
          />
        <ScrollView
          automaticallyAdjustContentInsets={false}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabel}>关于APP ({APP_VERSION})</Text>
            <Text style={styles.contentDesc}>
              {'      '}这是一款用react-native实现的Gank.io(干货集中营)客户端，支持Android及iOS，并针对不同平台的设计规范，界面也有一些差异化.{'\n'}
              {'      '}这里每日分享妹子图 和 技术干货，还有供大家中午休息的休闲视频，让你休闲技术两不误.
            </Text>
            <LinkText 
              navigator={this.props.navigator}
              linkUrl="https://github.com/iwgang/GankCamp-React-Native" 
              linkText="本项目已在GitHub上开源，点击直达"
              />
            <LinkText 
              navigator={this.props.navigator} 
              linkUrl="http://gank.io" 
              beforeText="感谢"
              linkText=" Gank.io "
              afterText="提供数据api"
              />
            <Text style={styles.contentDesc}>
              使用到的技术点：{'\n'}
              {'    •   '}react-native api{'\n'}
              {'    •   '}React.js + JSX{'\n'}
              {'    •   '}ES6{'\n'}
              {'    •   '}Redux
            </Text>
            <Text style={[styles.linkDescText, {marginTop: 10}]}>感谢以下开源：</Text>
            <LinkText 
              navigator={this.props.navigator} 
              beforeText="    •   "
              linkUrl="https://github.com/facebook/react-native" 
              linkText="react-native"
              />
            <LinkText 
              navigator={this.props.navigator} 
              beforeText="    •   "
              linkUrl="https://github.com/reactjs/react-redux" 
              linkText="react-redux"
              />
            <LinkText 
              navigator={this.props.navigator}
              beforeText="    •   " 
              linkUrl="https://github.com/gaearon/redux-thunk" 
              linkText="redux-thunk"
              />
            <LinkText 
              navigator={this.props.navigator}
              beforeText="    •   " 
              linkUrl="https://realm.io/docs/react-native/latest" 
              linkText="realm"
              />
            <LinkText 
              navigator={this.props.navigator} 
              beforeText="    •   "
              linkUrl="https://github.com/fbsamples/f8app" 
              linkText="f8app"
              />
            <LinkText 
              navigator={this.props.navigator} 
              beforeText="    •   "
              linkUrl="https://github.com/Bob1993/React-Native-Gank" 
              linkText="React-Native-Gank (By Bob1993)"
              />
            <LinkText 
              navigator={this.props.navigator} 
              beforeText="    •   "
              linkUrl="https://github.com/maxs15/react-native-spinkit" 
              linkText="react-native-spinkit（loading动画）"
              />

            <Text style={[styles.contentLabel, {marginTop: 30}]}>关于作者（iWgang）</Text>
            <Text style={styles.contentDesc}>{'    '}E-Mail{' '}：iWgang@163.com</Text>
            <LinkText 
              navigator={this.props.navigator} 
              linkUrl="https://github.com/iwgang" 
              beforeText="    GitHub："
              linkText="github.com/iwgang"
              />
            <LinkText 
              navigator={this.props.navigator} 
              linkUrl="http://weibo.com/iwgang" 
              beforeText="    WeiBo ："
              linkText="weibo.com/iwgang"
              />
	    		</View>
  	    </ScrollView>
    	</View>
    );
  }
  
}

class LinkText extends Component {

  render() {
    let beforeText;
    if (this.props.beforeText) {
      beforeText = <Text style={styles.linkDescText}>{this.props.beforeText}</Text>;
    }

    let afterText;
    if (this.props.afterText) {
      afterText = <Text style={styles.linkDescText}>{this.props.afterText}</Text>;
    }
    return (
      <View style={styles.linkTextContainer}>
        {beforeText}
        <TouchableOpacity onPress={this._onLinkTextPress.bind(this, this.props.linkUrl)}>
          <Text style={[styles.linkDescText, styles.linkText]}>{this.props.linkText}</Text>
        </TouchableOpacity>
        {afterText}
      </View>
    );
  }

  _onLinkTextPress(url) {
    this.props.navigator.push({
      component: WebViewPage,
      url,
    });
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_BACKGROUND_COLOR,
  },
  contentContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30,
  },
  contentLabel: {
    color: '#000000',
    fontSize: 17,
    marginTop: 20,
  },
  contentDesc: {
    color: '#999999',
    fontSize: 14,
		marginTop: 10,
		lineHeight: 23,
	},
  linkTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  linkDescText: {
    color: '#999999',
    fontSize: 14,
  },
  linkText: {
    textDecorationLine: 'underline',
  }
});

export default AboutPage;