import React from 'react';
import { TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';
import { COMMON_SELECT_COLOR } from '../GlobalConst';

function TouchableIOS(props) {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor={COMMON_SELECT_COLOR}
      {...props}
    />
  );
}

const CommonTouchableComp = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableIOS;

export default CommonTouchableComp;