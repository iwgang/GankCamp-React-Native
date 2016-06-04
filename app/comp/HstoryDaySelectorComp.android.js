import React, { Component } from 'react';
import { StyleSheet, View, Text, DrawerLayoutAndroid, ScrollView, Platform, ListView } from 'react-native';

import CommonTouchableComp from './CommonTouchableComp';
import { COMMON_BACKGROUND_COLOR, TITLE_BAR_HEIGHT, APP_MAIN_COLOR } from '../GlobalConst';

const PAGE_MAX_SIZE = 20;

class HstoryDaySelectorComp extends Component {

  static contextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.paddingTop = (Platform.OS === 'android' && Platform.Version < 19) ? 0 : (Platform.OS === 'android' ? 24 : 20);

    this.curPageNo = 1;
    this.renderDayHistoryDrawerMenuView = this._renderDayHistoryDrawerMenuView.bind(this);
    this.onDrawerOpen = this._onDrawerOpen.bind(this);
    this.onDrawerClose = this._onDrawerClose.bind(this);
    this.onBackButton = this._onBackButton.bind(this);

    this.state = {
      isLoadMore: true,
      listDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref="drawer"
        drawerWidth={190}
        drawerLockMode="locked-closed" 
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={this.renderDayHistoryDrawerMenuView}
        onDrawerOpen={this.onDrawerOpen}
        onDrawerClose={this.onDrawerClose} >
        {this.props.children}
      </DrawerLayoutAndroid>
    );
  }

  show(dataSource) {
    if (this.fullOriginalData === undefined) {
      this.fullOriginalData = dataSource;
      this.setState({
        listDataSource: this.state.listDataSource.cloneWithRows(this.fullOriginalData.slice(0, PAGE_MAX_SIZE)),
      });
    }
    this.refs.drawer.openDrawer();
  }

  _renderDayHistoryDrawerMenuView() {
    if (this.props.dataSource === undefined) return;
    return (
      <View style={{flex: 1}}>
        <View style={{height: this.paddingTop + TITLE_BAR_HEIGHT, backgroundColor: APP_MAIN_COLOR}} />
        <ListView
          style={{flex: 1}}
          dataSource={this.state.listDataSource}
          renderRow={this._renderItem.bind(this)}
          automaticallyAdjustContentInsets={false}
          onEndReachedThreshold={5}
          onEndReached={this.state.isLoadMore ? this._onLoadMore.bind(this) : null}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
          renderFooter={this.state.isLoadMore ? this._footerView : null}
          />
      </View>
    );
  }

  _renderItem(day, index) {
    return (
      <CommonTouchableComp key={index} onPress={this._onSelected.bind(this, day)}>
        <View style={styles.dayHistoryContainer}>
          <Text style={styles.dayHistoryText}>第{day}期</Text>
        </View>
      </CommonTouchableComp>
    );
  }

  /**
   * 加载更多
   */
  _onLoadMore() {
    this.curPageNo ++;
    if (this.curPageNo * PAGE_MAX_SIZE >= this.fullOriginalData.length) {
      this.setState({
        isLoadMore: false,
        listDataSource: this.state.listDataSource.cloneWithRows(this.fullOriginalData),
      });
    } else {
      this.setState({
        listDataSource: this.state.listDataSource.cloneWithRows(this.fullOriginalData.slice(0, this.curPageNo * PAGE_MAX_SIZE)),
      });
    }
  }

  _footerView() {
    return (
      <View style={styles.footerContainer}>
        <Text>
          正在加载中...
        </Text>
      </View>
    );
  }


  _onSelected(selDay) {
    this.refs.drawer.closeDrawer();
  	this.props.onSelected && this.props.onSelected(selDay);
  }

  _onDrawerOpen() {
    this.context.addBackButtonListener(this.onBackButton);
  }

  _onDrawerClose() {
    this.context.removeBackButtonListener(this.onBackButton);
  }

  _onBackButton() {
    if (this.refs.drawer !== undefined) {
      this.refs.drawer.closeDrawer();
      return true;
    }
    return false;
  }

}


const styles = StyleSheet.create({
  dayHistoryContainer: {
    height: 45,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  dayHistoryText: {
    color: '#333333',
    fontSize: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default HstoryDaySelectorComp;