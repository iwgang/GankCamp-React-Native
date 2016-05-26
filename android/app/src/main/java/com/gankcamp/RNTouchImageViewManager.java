package com.gankcamp;

import android.view.View;

import com.bm.library.PhotoView;
import com.bumptech.glide.Glide;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * 可放大缩小的图片组件桥接类
 *  -- 原生放大缩小图片使用的类库为（https://github.com/bm-x/PhotoView）
 * Created by iWgang on 16/05/26.
 * https://github.com/iwgang/GankCamp-React-Native
 */
public class RNTouchImageViewManager extends SimpleViewManager<PhotoView> implements View.OnClickListener, View.OnLongClickListener {
    private ReactApplicationContext mContext;
    private int mViewID;

    public RNTouchImageViewManager(ReactApplicationContext context) {
        mContext = context;
    }

    @Override
    public String getName() {
        return "RNTouchImageView";
    }

    @Override
    protected PhotoView createViewInstance(ThemedReactContext reactContext) {
        return new PhotoView(reactContext);
    }

    @ReactProp(name = "src")
    public void setSrc(PhotoView view, String url) {
        mViewID = view.getId();
        Glide.with(mContext)
                .load(url)
                .fitCenter()
                .crossFade()
                .into(view);
        view.setOnClickListener(this);
        view.setOnLongClickListener(this);
        view.enable();
    }

    @Override
    public void onClick(View v) {
        // 图片单击
        WritableMap event = Arguments.createMap();
        event.putString("eventType", "onClick");
        mContext.getJSModule(RCTEventEmitter.class).receiveEvent(mViewID, "topChange", event);
    }

    @Override
    public boolean onLongClick(View v) {
        WritableMap event = Arguments.createMap();
        event.putString("eventType", "onLongClick");
        mContext.getJSModule(RCTEventEmitter.class).receiveEvent(mViewID, "topChange", event);
        return true;
    }
}
