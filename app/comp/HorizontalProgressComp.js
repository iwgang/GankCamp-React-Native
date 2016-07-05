import React, { Component } from 'react';
import { View, ProgressViewIOS, ProgressBarAndroid, Platform } from 'react-native';


class HorizontalProgressComp extends Component {

  render() {
    if (Platform.OS === 'android') {
      return (
        <ProgressBarAndroid 
          styleAttr="Horizontal" 
          color={this.props.color} 
          progress={60}
          style={this.props.style}
          />
      );
    } else {
      return (
        <ProgressViewIOS  
          progress={0.98}
          trackTintColor={'#CCCCCC'}
          progressTintColor={this.props.color}
          style={this.props.style}
         />
      );
    }
  }

}


export default HorizontalProgressComp;