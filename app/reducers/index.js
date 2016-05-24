import { combineReducers } from 'redux';
import navigatorReducer from './navigator';
import homePageReducer from './homePage';
import girlPageReducer from './girlPage';
import gankRecommendPageReducer from './gankRecommendPage';
import gankListCompReducer from './gankListComp';

export default combineReducers({
  navigatorStore: navigatorReducer,
  homePageStore: homePageReducer,
  girlPageStore: girlPageReducer,
  gankListCompStore: gankListCompReducer,
  gankRecommendPageStore: gankRecommendPageReducer,
});
