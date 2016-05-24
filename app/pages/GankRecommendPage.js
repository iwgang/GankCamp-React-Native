/**
 * Tab_推荐页面
 *    1. 每日推荐干货信息
 *    2. 往期推荐干货日期列表
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  PickerIOS, 
  DrawerLayoutAndroid,
  Modal,
  Dimensions,
  Platform 
} from 'react-native';
import { connect } from 'react-redux';

import WebViewPage from './WebViewPage';
import CommonTouchableComp from '../comp/CommonTouchableComp';
import CustomTitleBarComp from '../comp/CustomTitleBarComp';
import CommonLoadView from '../comp/CommonLoadView';
import OvalButtonComp from '../comp/OvalButtonComp';
import { FETCH_GANK_DAY_DATA_STATUS } from '../actions/types';
import { fetchGankDay } from '../actions/gankApi';
import { COMMON_BACKGROUND_COLOR, TITLE_BAR_HEIGHT } from '../GlobalConst';


class GankDayPage extends Component {

  static contextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.renderDayHistoryDrawerMenuView = this._renderDayHistoryDrawerMenuView.bind(this);
    this.onDrawerOpen = this._onDrawerOpen.bind(this);
    this.onDrawerClose = this._onDrawerClose.bind(this);
    this.onBackButton = this._onBackButton.bind(this);
    this.onRightBtnClick = this._onRightBtnClick.bind(this);
    this.onRetry = this._onRetry.bind(this);

    this.state = {
      pickerDayHistoryModalVisible: false,
      pickerSelDay: null,
    };
  }
  componentDidMount() {
    this._fetchDayListData();
  }

  render() {
    let contentView;
    if (this.props.status === FETCH_GANK_DAY_DATA_STATUS.INITIALIZE
          || this.props.status === FETCH_GANK_DAY_DATA_STATUS.START) {
      contentView = <CommonLoadView loadState="ing" />;
    } else if (this.props.status === FETCH_GANK_DAY_DATA_STATUS.FAILURE) {
      contentView = <CommonLoadView loadState="error" onRetry={this.onRetry} />
    } else {
      contentView = Platform.OS === 'android' ? this._renderGankDayContentViewWrapAndroid() : this._renderGankDayContentViewWrapIOS();
    }
    let title = `推荐 ${this.props.day}`;
    return (
      <View style={styles.container}>
        <CustomTitleBarComp 
          title={title}
          onLeftBtnClick={this.props.onDrawerMenuToggle}
          rightText="往期"
          onRightBtnClick={this.onRightBtnClick}
          isMainPage={true} 
          />
    	  {contentView}
      </View>
    );
  }

  /**
   * 加载干货推荐列表
   */  
  _fetchDayListData() {
    fetch('http://gank.io/api/day/history')
      .then((response) => response.json())
      .then((responseData) => {
        this.dayHistorys = responseData.results;
        this._fetchDayData(this.dayHistorys[0]);
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
    }, 2000)
  }

  _onRightBtnClick() {
    if (Platform.OS === 'android') {
      if (this.refs.drawer !== undefined) {
        this.refs.drawer.openDrawer();
      }
    } else {
      this.setState({pickerDayHistoryModalVisible: true});
    }
  }

  _renderGankDayContentViewWrapAndroid() {
    return (
      <DrawerLayoutAndroid
        ref="drawer"
        drawerWidth={190}
        drawerLockMode="locked-closed" 
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={this.renderDayHistoryDrawerMenuView}
        onDrawerOpen={this.onDrawerOpen}
        onDrawerClose={this.onDrawerClose} >
        {this._renderGankDayContentView()}
      </DrawerLayoutAndroid>
    );
  }

  _renderGankDayContentViewWrapIOS() {
    return (
      <View style={{flex: 1}}>
        {this._renderGankDayContentView()}
        <Modal 
          transparent={true}
          visible={this.state.pickerDayHistoryModalVisible}
          onRequestClose={() => this.setState({pickerDayHistoryModalVisible: false})} >
          <View style={styles.pickerDayHistoryContainer}>
            <PickerIOS 
              style={{height: 230}}
              selectedValue={this.state.pickerSelDay}
              animationType="fade"
              onValueChange={(itemValue, itemPosition) => this.setState({pickerSelDay: itemValue})}>
              {this.dayHistorys.map((day, index) => {
                return (
                  <PickerIOS.Item key={index} label={'第' + day + '期'} value={day} />    
                );
              })}
            </PickerIOS>
            <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <OvalButtonComp onPress={() => this.setState({pickerDayHistoryModalVisible: false})}>取消</OvalButtonComp>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <OvalButtonComp onPress={() => this._onSelDayHistoryIOS()}>选择</OvalButtonComp>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  _renderGankDayContentView() {
  	let dataSource = this.props.dataSource;
  	let girlPicUrl = dataSource.results.福利[0].url;
  	let categoryContentView = this._renderCategoryContentViews(dataSource);
  	return (
      <ScrollView>
        <View style={{flex: 1, paddingBottom: 60}}>
          <Image source={{uri: girlPicUrl}} style={styles.headerGirlImage}/>
          {categoryContentView}
        </View>
      </ScrollView>
  	);
  }

  _renderDayHistoryDrawerMenuView() {
    if (this.dayHistorys === undefined) return;
    return (
      <ScrollView>
        <View>
          {this.dayHistorys.map((day, index) => {
            return (
              <CommonTouchableComp key={index} onPress={this._onSelDayHistoryAndroid.bind(this, this.dayHistorys[index])}>
                <View style={styles.dayHistoryContainer}>
                  <Text style={styles.dayHistoryText}>第{day}期</Text>
                </View>
              </CommonTouchableComp>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  _onSelDayHistoryAndroid(day) {
    this._onBackButton();
    this._fetchDayData(day);
  }

  _onSelDayHistoryIOS() {
    this.setState({pickerDayHistoryModalVisible: false});
    this._fetchDayData(this.state.pickerSelDay);
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
  	  <CommonTouchableComp key={index} onPress={this._onItemViewPress.bind(this, info.desc, info.url)}>
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

  _onItemViewPress(title, url) {
    this.props.navigator.push({
      component: WebViewPage,
      title, 
      url,
    });
  }

  _convertDay(day) {
    return day.replace(/-/g, '/');
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_BACKGROUND_COLOR,
  },
  headerGirlImage: {
  	height: 300,
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
  dayHistoryContainer: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  dayHistoryText: {
    color: '#333333',
    fontSize: 16,
  },
  pickerDayHistoryContainer: {
    backgroundColor: COMMON_BACKGROUND_COLOR,
    marginTop: TITLE_BAR_HEIGHT + 20,
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