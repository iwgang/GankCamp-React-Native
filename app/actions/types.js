export const ADD_USER = 'add_user';
export const GET_USER = 'get_user';

export const SWITCH_TAB = 'switch_tab';
export const SWITCH_TITLE_BAR_TAB = 'switch_title_bar_tab';
export const SWITCH_RECOMMEND_DAY = 'switch_recommend_day';

export const HOME_TABS = {
	HOME: 'home',
	GIRL: 'girl',
	GANK_DAY: 'gank_day',
	COLLECT: 'collect',
};

export const FETCH_GANK_DATA_STATUS = {
	INITIALIZE: 'fetch_gank_data_status_initialize',
	START: 'fetch_gank_data_status_start',
	SUCCESS: 'fetch_gank_data_status_success',
	FAILURE: 'fetch_gank_data_status_failure',
};

export const FETCH_GIRL_DATA_STATUS = {
	INITIALIZE: 'fetch_girl_data_status_initialize',
	START: 'fetch_girl_data_status_start',
	SUCCESS: 'fetch_girl_data_status_success',
	FAILURE: 'fetch_girl_data_status_failure',
};

export const FETCH_GANK_DAY_DATA_STATUS = {
	INITIALIZE: 'fetch_gank_day_data_status_initialize',
	START: 'fetch_gank_day_data_status_start',
	SUCCESS: 'fetch_gank_day_data_status_success',
	FAILURE: 'fetch_gank_day_data_status_failure',
};

export const FETCH_COLLECT_DATA_STATUS = {
	INITIALIZE: 'fetch_collect_data_status_initialize',
	SUCCESS: 'fetch_collect_data_status_success',

	ADD: 'fetch_add_collect_data_status_success',
	REMOVE: 'fetch_remove_collect_data_status_success',
	COLLECT_STATUS: 'fetch_collect_status_data_status_success',
};