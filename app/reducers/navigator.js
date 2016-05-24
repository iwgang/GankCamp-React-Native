import * as TYPES from '../actions/types';

const initialState = {
  tab: TYPES.HOME_TABS.HOME,
};

export default function navigator(state=initialState, action) {
  switch (action.type) {
    case TYPES.SWITCH_TAB:
      return {
        ...state,
        tab: action.tab,
      };
    default:
      return state;
  }
}
