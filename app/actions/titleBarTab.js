import * as TYPES from './types';

export function switchTitleBarTab(selTabIndex) {
	RLOG('actions -> titleBarTab -> switchTitleBarTab ' + selTabIndex);
	return {
    type: TYPES.SWITCH_TITLE_BAR_TAB,
    selTabIndex: selTabIndex,
	}
}