import React, { Component, PropTypes } from 'react';

import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class OvalButtonComp extends Component {

	static propTypes = {
		borderColor: PropTypes.string,
		textColor: PropTypes.string,
		onPress: PropTypes.func,
	};

  render() {
    return (
    	<TouchableHighlight underlayColor={'rgba(0,0,0,0)'} onPress={this.props.onPress}>
	      <View style={[styles.container, this.props.bgStyle]}>
	      	<Text style={[styles.text, this.props.bgStyle]}>{this.props.children}</Text>
	      </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  	paddingTop: 5,
  	paddingBottom: 5,
  	paddingLeft: 30,
  	paddingRight: 30,
    borderColor: '#CCCCCC',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
  	color: '#CCCCCC',
  	fontSize: 15,
  }
});


export default OvalButtonComp;