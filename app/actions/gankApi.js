import { 
  FETCH_GANK_DATA_STATUS, 
  FETCH_GIRL_DATA_STATUS, 
  FETCH_GANK_DAY_DATA_STATUS,
  FETCH_GANK_DAY_HISTORY_DATA_STATUS,
} from './types';

const PAGE_NUM = 10;


/**
 * 统一获取干货指定分类数据
 * typeObj:  指定Action type对象
 * opt：     0 初始化加载数据，1 下拉刷新，2 加载更多
 * category: 分类名称（如：Android、iOS、福利...）
 * pageNo：  当前加载的页码
 * ext：     扩展字段
 */
function fetchGankCategoryList(typeObj, opt, category, pageNo, ext) {
	return (dispatch) => {
	  dispatch({type: typeObj.START, opt: opt});
	  let reqUrl = `http://gank.io/api/data/${category}/${PAGE_NUM}/${pageNo}`;
	  RLOG('fetchGankList：' + reqUrl);
	  fetch(reqUrl)
	    .then((response) => response.json())
	    .then((responseData) => dispatch({type: typeObj.SUCCESS, opt, ext, data: responseData}))
	    .catch((error) => dispatch({type: typeObj.FAILURE, opt, ext, error}))
	};
}

/**
 * 获取干货列表数据
 * opt：   0 初始化加载数据，1 下拉刷新，2 加载更多
 * pageNo：当前加载的页码
 */
export function fetchGankList(opt, category, pageNo, ext) {
	RLOG('actions -> gankApi -> fetchGankList');
	return fetchGankCategoryList(FETCH_GANK_DATA_STATUS, opt, category, pageNo, ext);
}

/**
 * 获取妹纸列表数据
 * opt：   0 初始化加载数据，1 下拉刷新，2 加载更多
 * pageNo：当前加载的页码
 */
export function fetchGirlList(opt, pageNo) {
	RLOG('actions -> gankApi -> fetchGirlList >>>>>>>>>>>>>> ');
	return fetchGankCategoryList(FETCH_GIRL_DATA_STATUS, opt, '福利', pageNo);
}

/**
 * 获取指定日期的推荐干货
 * day:  年/月/日  eg: 2016/5/22
 */
export function fetchGankDay(day) {
	RLOG('actions -> gankApi -> fetchGankDay >>>>>>>>>>>>>> ');
	return (dispatch) => {
	  dispatch({type: FETCH_GANK_DAY_DATA_STATUS.START, day});
	  let reqUrl = `http://gank.io/api/day/${day}`;
	  RLOG('fetchGankDayUrl：' + reqUrl);
	  fetch(reqUrl)
	    .then((response) => response.json())
	    .then((responseData) => dispatch({type: FETCH_GANK_DAY_DATA_STATUS.SUCCESS, day, data: responseData}))
	    .catch((error) => dispatch({type: FETCH_GANK_DAY_DATA_STATUS.FAILURE, day, error}))
	};
}