package com.gankcamp;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 可放大缩小的图片组件Package
 *  -- 原生放大缩小图片使用的类库为（https://github.com/bm-x/PhotoView）
 * Created by iWgang on 16/05/26.
 * https://github.com/iwgang/GankCamp-React-Native
 */
public class RNTouchImageViewPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> list = new ArrayList<>();
        list.add(new RNTouchImageViewManager(reactContext));
        return list;
    }
}
