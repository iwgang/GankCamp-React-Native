[![@iwgang](https://img.shields.io/badge/weibo-%40iwgang-blue.svg)](http://weibo.com/iwgang)

# GankCamp-React-Native
这是一款用react-native实现的Gank.io(干货集中营)客户端，支持Android及iOS，并针对不同平台的设计规范，界面也有一些差异化.

#### 更新 v1.2 （下载[APK](https://raw.githubusercontent.com/iwgang/GankCamp-React-Native/master/apk/GankCamp_v1.2.apk)，iOS请自行编译）
1. Android版主界面切换逻辑调整，二次切换不会再重新加载
1. 增加启动页面
1. 已知bug修复

#### 更新 v1.1 （下载[APK](https://raw.githubusercontent.com/iwgang/GankCamp-React-Native/master/apk/GankCamp_v1.1.apk)，iOS请自行编译）
1. 增加收藏功能，DAO层使用[realm](https://realm.io/docs/react-native/latest)
1. 页面细节优化

### 截图
![](https://raw.githubusercontent.com/iwgang/GankCamp-React-Native/master/screenshot/gif_android.gif)

**左图：Android， 右图：iOS**  
<img src="https://raw.githubusercontent.com/iwgang/GankCamp-React-Native/master/screenshot/s1_android.jpg" width="360px" height="600px" />     <img src="https://raw.githubusercontent.com/iwgang/GankCamp-React-Native/master/screenshot/s1_ios.png" width="360px" height="600px"/>

**其它截图** (下列截图为Android版本的，iOS版本类似)  
<img src="https://raw.githubusercontent.com/iwgang/GankCamp-React-Native/master/screenshot/s0_splash.jpg" width="400px" height="650px"/>
<img src="https://raw.githubusercontent.com/iwgang/GankCamp-React-Native/master/screenshot/s2_android.jpg" width="400px" height="650px"/>
<img src="https://raw.githubusercontent.com/iwgang/GankCamp-React-Native/master/screenshot/s3_android.jpg" width="400px" height="650px"/>
<img src="https://raw.githubusercontent.com/iwgang/GankCamp-React-Native/master/screenshot/smenu_android.jpg" width="400px" height="650px"/>

### 运行
* 步骤一
```
git clone https://github.com/iwgang/GankCamp-React-Native.git
cd GankCamp-React-Native && npm install
```

* 步骤二
    * **Anroid**  
        react-native run-android 
    * **iOS**  
        进行ios目录下的GankCamp.xcodeproj文件（需提前安装好xcode）

### 感谢[Gank.io](http://gank.io)提供数据api
    
### 使用到的技术点

* react-native api
* React.js + JSX
* ES6
* Redux
* realm
   

### 感谢以下开源

* [react-native](https://github.com/facebook/react-native)
* [react-redux](https://github.com/reactjs/react-redux)
* [redux-thunk](https://github.com/gaearon/redux-thunk)
* [f8app](https://github.com/fbsamples/f8app)
* [realm](https://realm.io/docs/react-native/latest)
* [React-Native-Gank (By Bob1993)](https://github.com/Bob1993/React-Native-Gank)
* [react-native-spinkit（loading动画）](https://github.com/maxs15/react-native-spinkit)
* [PhotoView（by bm-x，android端的图片查看 原生库）](https://github.com/bm-x/PhotoView)

### License

`MIT`
