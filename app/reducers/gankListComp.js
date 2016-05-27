import { ListView } from 'react-native';
import { FETCH_GANK_DATA_STATUS } from '../actions/types';
import { DEBUG, RDEBUG } from '../GlobalConst';

const initialState = {
  status: FETCH_GANK_DATA_STATUS.INITIALIZE,
  dataArray: {},
  dataSource: new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }),
  isRefreshing: false,
  isLoadMore: true,
  opt: 0,
  ext: null,
};

// action.opt：0 初始化加载数据，1 下拉刷新，2 加载更多
export default function gankListComp(state=initialState, action) {
  if (DEBUG && RDEBUG) console.log('reducers -> gankListComp -> [' + action.type + ']');
  switch (action.type) {
    case FETCH_GANK_DATA_STATUS.INITIALIZE:
      return {
        ...state,
        status: action.type,
        opt: 0,
        ext: action.ext,
        isRefreshing: false,
      };
    case FETCH_GANK_DATA_STATUS.START:
      return {
        ...state,
        status: action.type,
        opt: action.opt,
        ext: action.ext,
        isRefreshing: action.opt === 1,
      };
    case FETCH_GANK_DATA_STATUS.SUCCESS:
      let newContent = action.opt === 2 ? [...state.dataArray, ...action.data.results] : action.data.results;
      let isLoadMore = action.data.results.length === 10;
      return {
        ...state,
        dataArray: newContent,
        dataSource: state.dataSource.cloneWithRows(newContent),
        status: action.type,
        opt: action.opt,
        ext: action.ext,
        isRefreshing: false,
        isLoadMore: isLoadMore,
      };
    case FETCH_GANK_DATA_STATUS.FAILURE:
      return {
        ...state,
        status: action.type,
        opt: action.opt,
        ext: action.ext,
        isRefreshing: false,
      };
    default:
      return state;
  }
}
