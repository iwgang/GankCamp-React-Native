import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, Image, Platform } from 'react-native';
import CommonTouchableComp from './CommonTouchableComp';
import CustomTitleBarHeaderTabComp from './CustomTitleBarHeaderTabComp';
import { TITLE_BAR_HEIGHT, APP_MAIN_COLOR } from '../GlobalConst';

const IMG_BACK_SRC = require('../img/icon/ic_back.png');
const IMG_DRAWER_TOGGLE_SRC = require('../img/icon/ic_drawer_toggle.png');


class CustomTitleBarComp extends Component {

  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.isMainPage = this.props.isMainPage;
    this.rightText = this.props.rightText;
  }

  /**
   * 供其它地方调用来改动标题栏中的tab指示器位置
   */
  onPageScroll(offset) {
    this.refs.titleBarHeaderTab.onPageScroll(offset);
  }

  render() {
    let placeholderView;
    let leftView;
    let rightView;

    if (this.props.onLeftBtnClick) {
      leftView = (
        <CommonTouchableComp onPress={this.props.onLeftBtnClick}>
          <View style={styles.bothBtnContainer}>
            <Image source={this.isMainPage ? IMG_DRAWER_TOGGLE_SRC : IMG_BACK_SRC} />
          </View>
        </CommonTouchableComp>
      );
    } else {
      leftView = <View style={styles.placeholderView} />;
    }

    if (this.rightText) {
      rightView = (
        <CommonTouchableComp onPress={this.props.onRightBtnClick}>
          <View style={styles.bothBtnContainer}>
            <Text style={styles.titleBarRightText}>{this.props.rightText}</Text>
          </View>
        </CommonTouchableComp>
      );
    } else {
      rightView = <View style={styles.placeholderView} />;
    }

    return (
      <View style={[styles.container, this.props.titleBarStyle]}>
        <View style={styles.titleBarContainer}>
          {leftView}
          <Text style={styles.titleBarTitle} numberOfLines={1}>{this.props.title}</Text>
          {rightView}
        </View>
        {this._renderHeaderTabContent()}
      </View>
    );
  }

  _renderHeaderTabContent() {
    if (typeof this.props.children === 'undefined') {
      return;
    }

    return (
      <CustomTitleBarHeaderTabComp ref="titleBarHeaderTab">
        {this.props.children}
      </CustomTitleBarHeaderTabComp>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: APP_MAIN_COLOR,
    paddingTop: (Platform.OS === 'android' && Platform.Version < 19) ? 0 : (Platform.OS === 'android' ? 24 : 20),
  },
  titleBarContainer: {
    flexDirection: 'row',
    height: TITLE_BAR_HEIGHT,
  },
  titleBarTitle: {
    flex: 1,
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: Platform.OS === 'android' ? 'left' : 'center',
  },
  bothBtnContainer: {
    width: TITLE_BAR_HEIGHT,
    height: TITLE_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBarRightText: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 15,
  },
  placeholderView: {
    width: TITLE_BAR_HEIGHT,
  },
});

CustomTitleBarComp.HeaderTabItem = CustomTitleBarHeaderTabComp.HeaderTabItem;

export default CustomTitleBarComp;