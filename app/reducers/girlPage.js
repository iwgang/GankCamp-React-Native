import { FETCH_GIRL_DATA_STATUS } from '../actions/types';
import { DEBUG, RDEBUG } from '../GlobalConst';

const initialState = {
  status: FETCH_GIRL_DATA_STATUS.INITIALIZE,
  dataSource: [],
  isRefreshing: false,
  isLoadMore: true,
  opt: 0,
};

// action.opt：0 初始化加载数据，1 下拉刷新，2 加载更多
export default function girlPage(state=initialState, action) {
  if (DEBUG && RDEBUG) console.log('reducers -> girlPage -> [' + action.type + ']');
  switch (action.type) {
    case FETCH_GIRL_DATA_STATUS.INITIALIZE:
      return {
        ...state,
        status: action.type,
        opt: 0,
        isRefreshing: false,
      };
    case FETCH_GIRL_DATA_STATUS.START:
      return {
        ...state,
        status: action.type,
        opt: action.opt,
        isRefreshing: action.opt === 1,
      };
    case FETCH_GIRL_DATA_STATUS.SUCCESS:
      let newContent = action.opt === 2 ? [...state.dataSource, ...action.data.results] : action.data.results;
      let isLoadMore = action.data.results.length === 10;
      return {
        ...state,
        dataSource: newContent,
        status: action.type,
        opt: action.opt,
        isRefreshing: false,
        isLoadMore: isLoadMore,
      };
    case FETCH_GIRL_DATA_STATUS.FAILURE:
      return {
        ...state,
        status: action.type,
        opt: action.opt,
        isRefreshing: false,
      };
    default:
      return state;
  }
}
