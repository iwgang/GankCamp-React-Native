import Realm from 'realm';


// 干货收藏表
class Collect extends Realm.Object {

	static schema = {
		name: 'Collect',
		primaryKey: 'url', // 设置url为主键
		properties: {
        title: 'string', // 标题
        url: 'string',   // url
        time: 'date',  // 收藏时间
    },
	};

}


export default new Realm({schema: [Collect]});

