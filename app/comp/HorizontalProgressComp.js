import React, { Component } from 'react';
import { StyleSheet, View, ProgressViewIOS, ProgressBarAndroid, Platform } from 'react-native';


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
	  	 		progressTintColor="purple" 
	  	 		/>
      );
    }
  }

}


const styles = StyleSheet.create({

});


export default HorizontalProgressComp;