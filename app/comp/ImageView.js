import React, { Component } from 'react';
import { View, Image, Platform } from 'react-native';


class ImageViewAndroid extends Component {
  render() {
    return (
      <View>
      	<Image 
      		style={[this.props.style, {position: 'absolute', top: 0, left: 0, right: 0, left: 0}]}
      		source={this.props.defaultSource} 
      		resizeMode={Image.resizeMode.stretch} />
      	<Image {...this.props}>
      		{this.props.children}
      	</Image>
      </View>
    );
  }
}


const ImageViewComp = Platform.OS === 'android' ? ImageViewAndroid : Image;

export default ImageViewComp;