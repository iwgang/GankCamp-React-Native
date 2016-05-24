import * as TYPES from './types';

export function switchTab(tab) {
	RLOG('actions -> navigator -> switchTab ' + tab);
	return {
    type: TYPES.SWITCH_TAB,
    tab: tab,
	}
}