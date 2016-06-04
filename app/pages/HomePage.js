/**
 * Tab_干货页面
 *    1. 干货列表ViewPager（使用自定义组件的ViewPagerComp）
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import AboutPage from './AboutPage';
import CustomTitleBarComp from '../comp/CustomTitleBarComp';
import ViewPagerComp from '../comp/ViewPagerComp';
import GankListComp from './comppages/GankListComp';
import { switchTitleBarTab } from '../actions/titleBarTab';
import { COMMON_BACKGROUND_COLOR } from '../GlobalConst';


class HomePage extends Component {

  constructor(props) {
    super(props);
    
    this.onViewPageScroll = this._onViewPageScroll.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomTitleBarComp 
          ref="titleBar"
          title="干货" 
          onLeftBtnClick={this.props.onDrawerMenuToggle} 
          isMainPage={true} 
          rightText="关于"
          onRightBtnClick={() => this.props.navigator.push({component: AboutPage})} >
          <CustomTitleBarComp.HeaderTabItem
            tabText="Android"
            selected={this.props.selectedTabIndex == 0} 
            onTabClick={this._switchTitleBarTab.bind(this, 0)}
            />
          <CustomTitleBarComp.HeaderTabItem
            tabText={'iOS'}
            selected={this.props.selectedTabIndex == 1} 
            onTabClick={this._switchTitleBarTab.bind(this, 1)}
            />
          <CustomTitleBarComp.HeaderTabItem
            tabText={'前端'}
            selected={this.props.selectedTabIndex == 2} 
            onTabClick={this._switchTitleBarTab.bind(this, 2)}
            />
        </CustomTitleBarComp>
        <ViewPagerComp 
          selectedIndex={this.props.selectedTabIndex}
          onViewPageScroll={this.onViewPageScroll}
          onSelectedIndexChange={(curSelIndex) => this._switchTitleBarTab(curSelIndex)}>
          <GankListComp 
            tagName="tag_1"
            category="Android"
            navigator={this.props.navigator}
            />
          <GankListComp 
            tagName="tag_2"
            category="iOS"
            navigator={this.props.navigator}
            />
          <GankListComp 
            tagName="tag_3"
            category="前端"
            navigator={this.props.navigator}
            />
        </ViewPagerComp>
      </View>
    );
  }

  _switchTitleBarTab(selIndex) {
    if (this.props.selectedTabIndex !== selIndex) {
      this.props.dispatch(switchTitleBarTab(selIndex));
    }
  }

  _onViewPageScroll(offset) {
    this.refs.titleBar.onPageScroll(offset);
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COMMON_BACKGROUND_COLOR,
  },
});

function select(store) {
  return {
    selectedTabIndex: store.homePageStore.selectedTabIndex,
  }
}

export default connect(select)(HomePage);