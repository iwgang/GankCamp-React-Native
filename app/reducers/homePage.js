import * as TYPES from '../actions/types';

const initialState = {
  selectedTabIndex: 0,
};


export default function homePage(state=initialState, action) {
  switch (action.type) {
    case TYPES.SWITCH_TITLE_BAR_TAB:
      return {
        ...state,
        selectedTabIndex: action.selTabIndex,
      };
    default:
      return state;
  }
}