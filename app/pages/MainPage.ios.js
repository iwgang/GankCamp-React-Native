/**
 * iOS版主页面
 *    1. 实现主界面布局，iOS版本使用的是底部Tab(TabBarIOS + TabBarIOS.Item)Pgae的风格
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TabBarIOS, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import HomePage from './HomePage'
import GankRecommendPage from './GankRecommendPage'
import GirlPage from './GirlPage'
import CollectListPage from './CollectListPage'
import { HOME_TABS } from '../actions/types';
import { switchTab } from '../actions/navigator';


class MainPage extends Component {

  _onTabSelect(tab) {
    if (this.props.tab !== tab) {
      this.props.dispatch(switchTab(tab));
    }
  }

  render() {
  	return (
 	  <TabBarIOS
        tintColor={'#FF5000'}
        barTintColor={'#F5FCFF'}>
        <TabBarIOS.Item
          title="干货"
          icon={require('../img/tabicon/ic_home_tab_gank.png')}
          selected={this.props.tab === HOME_TABS.HOME}
          onPress={this._onTabSelect.bind(this, HOME_TABS.HOME)}>
          <HomePage navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="推荐"
          icon={require('../img/tabicon/ic_home_tab_rec.png')}
          selected={this.props.tab === HOME_TABS.GANK_DAY}
          onPress={this._onTabSelect.bind(this, HOME_TABS.GANK_DAY)}>
          <GankRecommendPage navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="妹纸"
          icon={require('../img/tabicon/ic_home_tab_girl.png')}
          selected={this.props.tab === HOME_TABS.GIRL}
          onPress={this._onTabSelect.bind(this, HOME_TABS.GIRL)}>
          <GirlPage navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="收藏"
          icon={require('../img/tabicon/ic_home_tab_collect.png')}
          selected={this.props.tab === HOME_TABS.COLLECT}
          onPress={this._onTabSelect.bind(this, HOME_TABS.COLLECT)}>
          <CollectListPage navigator={this.props.navigator} />
        </TabBarIOS.Item>
      </TabBarIOS>
  	);
  }

}


const styles = StyleSheet.create({

});

function select(store) {
  return {
    tab: store.navigatorStore.tab,
  }
}

export default connect(select)(MainPage);
