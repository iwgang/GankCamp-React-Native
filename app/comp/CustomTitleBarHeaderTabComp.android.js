import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Animated } from 'react-native';
import { TITLE_BAR_HEIGHT } from '../GlobalConst';

const TAB_WIDTH = 60;
const TAB_HEIGHT = 30;

class CustomTitleBarHeaderTabComp extends Component {

  constructor(props) {
  	super(props);

  	this.state = {
      leftTabUnderline: new Animated.Value(0),
    };
  }

  render() {
  	const dynamicTabUnderline = {
      left: this.state.leftTabUnderline,
    };
    return (
      <View style={styles.container}>
        {this.props.children}
        <View style={{height: TAB_HEIGHT}} />
        <Animated.View style={[styles.indicatorBase, dynamicTabUnderline]} />
      </View>
    );
  }

  onPageScroll(offset) {
    if (offset === 0) return;
    this.state.leftTabUnderline.setValue(TAB_WIDTH * offset);
  }

}

class HeaderTabItem extends Component {
    
  render() {
    return (
      <TouchableHighlight underlayColor={'rgba(0,0,0,0)'} onPress={this.props.onTabClick}>
        <View style={styles.headerTabsTextContainer}>
        	<Text style={styles.headerTabsText}>{this.props.tabText}</Text>
     		</View>
      </TouchableHighlight>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 5,
    alignSelf: 'flex-start',
    marginLeft:TITLE_BAR_HEIGHT,
  },
	headerTabsText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerTabsTextContainer: {
    width: TAB_WIDTH,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  indicatorBase: {
    position: 'absolute',
    height: 3,
    width: TAB_WIDTH,
    backgroundColor: '#19D6B4',
    bottom: 0,
  }
});

CustomTitleBarHeaderTabComp.HeaderTabItem = HeaderTabItem;

export default CustomTitleBarHeaderTabComp;