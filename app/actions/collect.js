import { FETCH_COLLECT_DATA_STATUS } from './types';
import { getCollects, addCollect, removeCollect, isCollect } from '../db/collecDBtHelper';


/**
 * 获取收藏列表数据
 */
export function fetchCollectListAction() {
	let collects = getCollects();
	return {
		type: FETCH_COLLECT_DATA_STATUS.SUCCESS,
		data: collects,
	};
}

/**
 * 添加收藏
 * title: 标题
 * url:   链接url
 */
export function addCollectAction(title, url) {
	let newCollect = addCollect(title, url);
	return {
		type: FETCH_COLLECT_DATA_STATUS.ADD,
		data: newCollect,
	};
}

/**
 * 移除收藏
 * url:   链接url
 */
export function removeCollectAction(url) {
	removeCollect(url);
	let collects = getCollects();
	return {
		type: FETCH_COLLECT_DATA_STATUS.REMOVE,
		data: collects,
	};
}

/**
 * 收藏状态
 * url:   链接url
 */
export function collectStatusAction(url) {
	let isCollected = isCollect(url);
	return {
		type: FETCH_COLLECT_DATA_STATUS.COLLECT_STATUS,
		isCollect: isCollected,
	};
}