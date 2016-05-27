import { ListView } from 'react-native';
import { FETCH_COLLECT_DATA_STATUS } from '../actions/types';
import { DEBUG, RDEBUG } from '../GlobalConst';

const initialState = {
  status: FETCH_COLLECT_DATA_STATUS.INITIALIZE,
  dataArray: [],
  dataSource: new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }),
  isCollect: false,
  isNotData: false,
};

export default function collectListPage(state=initialState, action) {
  if (DEBUG && RDEBUG) console.log('reducers -> collectListPage -> [' + action.type + ']');
  switch (action.type) {
    case FETCH_COLLECT_DATA_STATUS.COLLECT_STATUS: // 获取收藏状态
      return {
        ...state,
        isCollect: action.isCollect,
      };
    case FETCH_COLLECT_DATA_STATUS.ADD: // 添加收藏
      let addNewContent = [...state.dataArray, action.data];
      return {
        ...state,
        dataArray: addNewContent,
        dataSource: state.dataSource.cloneWithRows(addNewContent),
        status: FETCH_COLLECT_DATA_STATUS.SUCCESS,
        isCollect: true,
        isNotData: false,
      };
    case FETCH_COLLECT_DATA_STATUS.REMOVE: // 移除收藏
      let removeAfterNewContent = action.data;
      return {
        ...state,
        dataArray: removeAfterNewContent,
        dataSource: state.dataSource.cloneWithRows(removeAfterNewContent),
        status: FETCH_COLLECT_DATA_STATUS.SUCCESS,
        isCollect: false,
        isNotData: removeAfterNewContent.length === 0,
      };

    case FETCH_COLLECT_DATA_STATUS.INITIALIZE:
      return {
        ...state,
        status: action.type,
      };
    case FETCH_COLLECT_DATA_STATUS.SUCCESS:
      let newContent = action.opt === 2 ? [...state.dataArray, ...action.data] : action.data;
      return {
        ...state,
        dataArray: newContent,
        dataSource: state.dataSource.cloneWithRows(newContent),
        status: action.type,
        isNotData: newContent.length === 0,
      };
    default:
      return state;
  }
}
