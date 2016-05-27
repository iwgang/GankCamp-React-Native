import realm from './realm';

const TABLE_NAME = 'Collect';

/**
 * 添加收藏
 * title 标题
 * url   链接url 
 */
export function addCollect(title, url) {
	let timeFormat = title;
	let newCollect = {
		title, 
		url, 
		time: new Date()
	};
	realm.write(() => {
    realm.create(TABLE_NAME, newCollect);
  });

  return newCollect;
}

/**
 * 获取全部收藏
 */
export function getCollects() {
	let tempDatas = realm.objects(TABLE_NAME);
	if (null === tempDatas) {
		return [];
	} 

	return [...realm.objects(TABLE_NAME).sorted('time', true)];
}

/**
 * 获取是否已经收藏
 */
export function isCollect(url) {
	let tempObj = realm.objects(TABLE_NAME).filtered(`url = "${url}"`);
	return null !== tempObj && tempObj.length > 0;
}

/**
 * 根据url删除收藏
 */
export function removeCollect(url) {
	let tempObj = realm.objects(TABLE_NAME).filtered(`url = "${url}"`);
	if (null !== tempObj && tempObj.length > 0) {
		realm.write(() => {
			realm.delete(tempObj);
		});
		return true;
	}
	return false;
}