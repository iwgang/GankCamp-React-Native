import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import CommonTouchableComp from './CommonTouchableComp';
import { HOME_TABS } from '../actions/types';
import { COMMON_SELECT_COLOR } from '../GlobalConst';

const ICON_TAB_GANK = require('../img/tabicon/ic_home_tab_gank.png');
const ICON_TAB_REC = require('../img/tabicon/ic_home_tab_rec.png');
const ICON_TAB_GIRL = require('../img/tabicon/ic_home_tab_girl.png');
const ICON_TAB_COLLECT = require('../img/tabicon/ic_home_tab_collect.png');


class DrawerMenuComp extends Component {

  _renderDrawerItem(tag, itemText, itemIcon) {
    return (
      <CommonTouchableComp onPress={this.props.onTabSelect(tag)}>
        <View style={[styles.drawerItemContainer, this.props.tab === tag && styles.drawerItemContainerSelected]}>
          <Image source={itemIcon} />
          <Text style={[styles.drawerItemText, this.props.tab === tag && styles.drawerItemTextSelected]}>{itemText}</Text>
        </View>
      </CommonTouchableComp>
    );
  }

  render() {
    return (
      <View style={styles.drawerContainer}>
        <View style={styles.drawerHeaderContainer} >
          <Text style={styles.drawerHeaderText1}>干货集中营</Text>
          <Text style={styles.drawerHeaderText2}>Gank.io</Text>
          <Text style={styles.drawerHeaderText3}>每日分享妹子图 和 技术干货，还有供大家中午休息的休闲视频</Text>
        </View>
        {this._renderDrawerItem(HOME_TABS.HOME, '干货', ICON_TAB_GANK)}

        {this._renderDrawerItem(HOME_TABS.GANK_DAY, '推荐', ICON_TAB_REC)}

        {this._renderDrawerItem(HOME_TABS.GIRL, '妹纸', ICON_TAB_GIRL)}

        {this._renderDrawerItem(HOME_TABS.COLLECT, '收藏', ICON_TAB_COLLECT)}
  	  </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeaderContainer: {
    height: 150,
    backgroundColor: '#8C978B',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'android' && Platform.Version < 19) ? 0 : (Platform.OS === 'android' ? 24 : 20),
  },
  drawerHeaderText1: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  drawerHeaderText2: {
    color: '#CCCCCC',
    fontSize: 13,
    alignSelf: 'center',
  },
  drawerHeaderText3: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 10,
  },
  drawerItemContainer: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
  },
  drawerItemContainerSelected: {
    backgroundColor: COMMON_SELECT_COLOR,
  },
  drawerItemText: {
  	color: '#999999',
  	textAlign: 'center',
    marginLeft: 10,
    fontSize: 16,
  	textAlignVertical: 'center',
  },
  drawerItemTextSelected: {
    color: '#495c73',
  },
});


export default DrawerMenuComp;