/**
 * Tab_推荐页面
 *    1. 每日推荐干货信息
 *    2. 往期推荐干货日期列表
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import WebViewPage from './WebViewPage';
import ShowPicturePage from './ShowPicturePage';
import CommonTouchableComp from '../comp/CommonTouchableComp';
import CustomTitleBarComp from '../comp/CustomTitleBarComp';
import CommonLoadView from '../comp/CommonLoadView';
import HstoryDaySelectorComp from '../comp/HstoryDaySelectorComp';
import { FETCH_GANK_DAY_DATA_STATUS } from '../actions/types';
import { fetchGankDay } from '../actions/gankApi';
import { COMMON_BACKGROUND_COLOR, TITLE_BAR_HEIGHT } from '../GlobalConst';
import { HOME_TABS } from '../actions/types';

const HEADER_PIC_HEIGHT = 330;
const SCROLL_MAX_SIZE = HEADER_PIC_HEIGHT - TITLE_BAR_HEIGHT - ((Platform.OS === 'android' && Platform.Version < 19) ? 0 : (Platform.OS === 'android' ? 24 : 20));


class GankDayPage extends Component {

  constructor(props) {
    super(props);

    this.isInitLoadData = false;
    this.onRightBtnClick = this._onRightBtnClick.bind(this);
    this.onRetry = this._onRetry.bind(this);
    this.onScroll = this._onScroll.bind(this);
  }

  componentDidMount() {
    if (Platform.OS !== 'android') {
      this._fetchDayListData();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (Platform.OS !== 'android') return true;

    if (nextProps.curSelTag !== HOME_TABS.GANK_DAY) return false;

    if (!this.isInitLoadData) {
      this.isInitLoadData = true;
      this._fetchDayListData();
      return false;
    }

    return true;
  }

  render() {
    if (this.props.status === FETCH_GANK_DAY_DATA_STATUS.INITIALIZE
          || this.props.status === FETCH_GANK_DAY_DATA_STATUS.START) {
      return <CommonLoadView loadState="ing" />;
    } else if (this.props.status === FETCH_GANK_DAY_DATA_STATUS.FAILURE) {
      return <CommonLoadView loadState="error" onRetry={this.onRetry} />;
    } else {
      let titleBarView = (
        <CustomTitleBarComp 
            ref="titleBarComp"
            title={`推荐 ${this.props.day}`}
            onLeftBtnClick={this.props.onDrawerMenuToggle}
            rightText="往期"
            onRightBtnClick={this.onRightBtnClick}
            isMainPage={true} 
            titleBarStyle={{position: 'absolute', top: 0, left: 0, right: 0}}
            defBackgroundOpacity={0}
            />
      );
      let contentView = this._renderGankDayContentView();
      if (Platform.OS === 'android') {
        return (
          <View style={styles.container}>
            <HstoryDaySelectorComp
              ref="hstoryDaySelectorComp"
              dataSource={this.historyDayDataList}
              onSelected={this._onSelDayHistory.bind(this)}
              >
              {contentView}
            </HstoryDaySelectorComp>
            {titleBarView}
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            {contentView}
            <HstoryDaySelectorComp
              ref="hstoryDaySelectorComp"
              onSelected={this._onSelDayHistory.bind(this)}
              />
            {titleBarView}
          </View>
        );
      }
    }
  }

  /**
   * 加载干货推荐列表
   */  
  _fetchDayListData() {
    fetch('http://gank.io/api/day/history')
      .then((response) => response.json())
      .then((responseData) => {
        this.historyDayDataList = responseData.results;
        this._fetchDayData(this.historyDayDataList[0]);
      })
      .catch((error) => {
        this.props.dispatch({type: FETCH_GANK_DAY_DATA_STATUS.FAILURE});
      });
  }

  _fetchDayData(day) {
    this.curDay = day;
    this.props.dispatch(fetchGankDay(this._convertDay(day)));
  }

  /**
   * 加载失败后重试
   */
  _onRetry() {
    this.props.dispatch({type: FETCH_GANK_DAY_DATA_STATUS.INITIALIZE});
    // 延迟2秒再调用数据
    setTimeout(() => {
      if (typeof this.curDay === 'undefined') {
        this._fetchDayListData();
      } else {
        this._fetchDayData(this.curDay);
      }
    }, 2000);
  }

  _onRightBtnClick() {
    this.refs.hstoryDaySelectorComp.show(this.historyDayDataList, this.originalDay);
  }

  _renderGankDayContentView() {
    let dataSource = this.props.dataSource;
    let girlPicUrl = dataSource.results.福利[0].url;
    let categoryContentView = this._renderCategoryContentViews(dataSource);
    return (
      <ScrollView
        onScroll={this.onScroll}
        scrollEventThrottle={5}
        bounces={false}
        automaticallyAdjustContentInsets={false}>
        <View style={{flex: 1, paddingBottom: 60}}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={this._onItemViewPress.bind(this, '', girlPicUrl, '福利')}
            >
            <Image source={{uri: girlPicUrl}} style={styles.headerGirlImage}/>
          </TouchableOpacity>
          {categoryContentView}
        </View>
      </ScrollView>
    );
  }

  _renderCategoryContentViews(dataSource) {
    dataSource.category.sort(); // 分类名称重新排序
    return dataSource.category.map((categoryName, index) => (
      <View key={index}>
        <Text style={styles.categoryLabel}>{categoryName}</Text>
        <View style={styles.categoryLine} />
        {this._renderCategoryChildContentViews(dataSource, categoryName)}
      </View>
    ));
  }

  _renderCategoryChildContentViews(dataSource, categoryName) {    
    return dataSource.results[categoryName].map((info, index) => (
      <CommonTouchableComp key={index} onPress={this._onItemViewPress.bind(this, info.desc, info.url, categoryName)}>
        <View style={styles.categoryChildContainer}>
          <View style={styles.categoryChildTitleContainer}>
            <Text style={styles.categoryChildTitleDot}>•{'  '}</Text>
            <Text style={styles.categoryChildTitle}>{info.desc}</Text>
          </View>
          <Text style={styles.categoryChildAuthor}>{info.who}</Text>
        </View>
      </CommonTouchableComp>
    ));
  }

  _onItemViewPress(title, url, categoryName) {
    if ('福利' === categoryName) {
      this.props.navigator.push({
        component: ShowPicturePage, 
        picUrl: url,
      });
    } else {
      this.props.navigator.push({
        component: WebViewPage,
        title, 
        url,
      });
    }
  }

  _convertDay(day) {
    this.originalDay = day;
    return day.replace(/-/g, '/');
  }

  _onSelDayHistory(selDay) {
    this._fetchDayData(selDay);
    this.refs.titleBarComp.setBackgroundOpacity && this.refs.titleBarComp.setBackgroundOpacity(0);
  }

  _onScroll(event) {
    let offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > SCROLL_MAX_SIZE) {
      offsetY = SCROLL_MAX_SIZE;
    }
    let opacity = offsetY / SCROLL_MAX_SIZE;
    this.refs.titleBarComp.setBackgroundOpacity && this.refs.titleBarComp.setBackgroundOpacity(opacity);
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_BACKGROUND_COLOR,
  },
  headerGirlImage: {
    height: HEADER_PIC_HEIGHT,
  },
  categoryLabel: {
    color: '#000000',
    fontSize: 20,
    marginTop: 30,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  categoryLine: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
  categoryChildContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 15,
  },
  categoryChildTitleContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  categoryChildTitleDot: {
    color: '#333333',
    fontSize: 14,
  },
  categoryChildTitle: {
    flex: 1,
    color: '#333333',
    fontSize: 14,
    marginRight: 10,
  },
  categoryChildAuthor: {
    color: '#999999',
    fontSize: 14,
  },
});

function select(store) {
  return {
    status: store.gankRecommendPageStore.status,
    dataSource: store.gankRecommendPageStore.dataSource,
    day: store.gankRecommendPageStore.day,
  }
}

export default connect(select)(GankDayPage);