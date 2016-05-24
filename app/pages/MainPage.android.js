/**
 * Android版主页面
 *    1. 实现主界面布局，Android版本使用的是侧边(DrawerLayoutAndroid)切换Tab Pgae的风格
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component } from 'react';
import { View, StyleSheet, DrawerLayoutAndroid } from 'react-native';
import { connect } from 'react-redux';

import HomePage from './HomePage'
import GankRecommendPage from './GankRecommendPage'
import GirlPage from './GirlPage'
import AboutPage from './AboutPage'
import DrawerMenuComp from '../comp/DrawerMenuComp';
import { HOME_TABS } from '../actions/types';
import { switchTab } from '../actions/navigator';


class MainPage extends Component {

  static contextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
  };

  constructor(props, context) {
	  super(props, context);

	  this.renderDrawerMenuView = this._renderDrawerMenuView.bind(this);
    this.onDrawerOpen = this._onDrawerOpen.bind(this);
    this.onDrawerClose = this._onDrawerClose.bind(this);
    this.onBackButton = this._onBackButton.bind(this);
    this.onDrawerMenuToggle = this._onDrawerMenuToggle.bind(this);
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref="drawer"
        drawerWidth={290}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderDrawerMenuView}
        onDrawerOpen={this.onDrawerOpen}
        onDrawerClose={this.onDrawerClose} >
        <View style={styles.content} key={this.props.tab}>
          {this._renderContentPage()}
        </View>
      </DrawerLayoutAndroid>
    );
  }

  _renderContentPage() {
    switch (this.props.tab) {
      case HOME_TABS.HOME: 
        return (
          <HomePage navigator={this.props.navigator} onDrawerMenuToggle={this.onDrawerMenuToggle} />
        );
      case HOME_TABS.GANK_DAY:
        return (
          <GankRecommendPage navigator={this.props.navigator} onDrawerMenuToggle={this.onDrawerMenuToggle} />
        )
      case HOME_TABS.GIRL: 
        return (
          <GirlPage navigator={this.props.navigator} onDrawerMenuToggle={this.onDrawerMenuToggle} />
        );
      case HOME_TABS.ABOUT: 
        return (
          <AboutPage navigator={this.props.navigator} onDrawerMenuToggle={this.onDrawerMenuToggle} />
        );
    }

    throw new Error(`Unknown tab ${this.props.tab}`);
  }

  _onDrawerOpen() {
    this.context.addBackButtonListener(this.onBackButton);
  }

  _onDrawerClose() {
    this.context.removeBackButtonListener(this.onBackButton);
  }

  _onTabSelect(tab) {
    this.refs.drawer.closeDrawer();

    if (this.props.tab !== tab) {
      this.props.dispatch(switchTab(tab));
    }
  }

  _onDrawerMenuToggle() {
    this.refs.drawer.openDrawer();
  }

  _onBackButton() {
    this.refs.drawer.closeDrawer();
    return true;
  }

  _renderDrawerMenuView() {
    return <DrawerMenuComp tab={this.props.tab} onTabSelect={(tab) => this._onTabSelect.bind(this, tab)} />;
  }

}


const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

function select(store) {
  return {
    tab: store.navigatorStore.tab,
  }
}

export default connect(select)(MainPage);
