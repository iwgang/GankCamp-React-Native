/**
 * 收藏列表页面
 *    1. 收藏列表（使用ListView）
 * Created by iWgang on 16/05/27.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component } from 'react';
import { StyleSheet, ListView, Text, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import WebViewPage from './WebViewPage';
import CustomTitleBarComp from '../comp/CustomTitleBarComp';
import CommonTouchableComp from '../comp/CommonTouchableComp';
import CommonLoadView from '../comp/CommonLoadView';
import { FETCH_COLLECT_DATA_STATUS } from '../actions/types';
import { fetchCollectListAction } from '../actions/collect';
import { showToast } from '../comp/CommonComp';
import { COMMON_BACKGROUND_COLOR } from '../GlobalConst';
import { HOME_TABS } from '../actions/types';


class CollectListPage extends Component {

  constructor(props) {
    super(props);

    this.isInitLoadData = false;
  }

  componentDidMount() {
    if (Platform.OS !== 'android') {
      this._fetchData();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (Platform.OS !== 'android') return true;

    if (nextProps.curSelTag !== HOME_TABS.COLLECT) return false;

    if (!this.isInitLoadData) {
      this.isInitLoadData = true;
      this._fetchData();
      return false;
    }

    return true;
  }

  render() {
    let contentView;
    if (this.props.status === FETCH_COLLECT_DATA_STATUS.INITIALIZE) {
      contentView = <CommonLoadView loadState="ing" />;
    } else {
      if (this.props.isNotData) {
        contentView = (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>还没有收藏哦...</Text>
          </View>
        );
      } else {
        contentView = (
          <ListView
            automaticallyAdjustContentInsets={false}
            dataSource={this.props.dataSource}
            renderRow={this._renderItem.bind(this)}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
            />
        );
      }
    }
    return (
      <View style={styles.container}>
        <CustomTitleBarComp  title="收藏" onLeftBtnClick={this.props.onDrawerMenuToggle} isMainPage={true} />
        {contentView}
      </View>
    );
  }

  /**
   * 加载收藏列表数据
   */  
  _fetchData() {
    this.props.dispatch(fetchCollectListAction());
  }

  _onItemViewPress(gankData) {
    this.props.navigator.push({
      component: WebViewPage,
      title: gankData.title,
      url: gankData.url,
    });
  }

  _renderItem(gankData) {
    return (
      <CommonTouchableComp onPress={this._onItemViewPress.bind(this, gankData)}>
        <View style={styles.itemViewContainer}>
          <Text style={styles.title} numberOfLines={2}>{gankData.title}</Text>
          <Text style={styles.time}>收藏于：{this._formatTime(gankData.time)}</Text>
        </View>
      </CommonTouchableComp>
    );
  }

  _formatTime(date) {
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_BACKGROUND_COLOR,
  },
  itemViewContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000000',
  },
  time: {
    fontSize: 14,
    color: '#999999',
    alignSelf: 'flex-end',
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
});

function select(store) {
  return {
    status: store.collectStore.status,
    dataSource: store.collectStore.dataSource,
    isNotData: store.collectStore.isNotData,
  }
}

export default connect(select)(CollectListPage);