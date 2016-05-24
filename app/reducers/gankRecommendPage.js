import { FETCH_GANK_DAY_DATA_STATUS } from '../actions/types';
import { DEBUG, RDEBUG } from '../GlobalConst';

const initialState = {
  status: FETCH_GANK_DAY_DATA_STATUS.INITIALIZE,
  dataSource: {},
  day: '',
};

export default function gankDayComp(state=initialState, action) {
  if (DEBUG && RDEBUG) console.log('reducers -> gankDayComp -> [' + action.type + ']');
  switch (action.type) {
    case FETCH_GANK_DAY_DATA_STATUS.INITIALIZE:
      return {
        ...state,
        status: action.type,
        day: action.day,
      };
    case FETCH_GANK_DAY_DATA_STATUS.START:
      return {
        ...state,
        status: action.type,
        day: action.day,
      };
    case FETCH_GANK_DAY_DATA_STATUS.SUCCESS:
      return {
        ...state,
        dataSource: action.data,
        status: action.type,
        day: action.day,
      };
    case FETCH_GANK_DAY_DATA_STATUS.FAILURE:
      return {
        ...state,
        status: action.type,
        day: action.day,
      };
    default:
      return state;
  }
}