import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Animated } from 'react-native';

const TAB_WIDTH = 75;
const TAB_HEIGHT = 25;

class CustomTitleBarHeaderTabComp extends Component {

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }

}

class HeaderTabItem extends Component {
    
  render() {
    return (
      <TouchableHighlight underlayColor={'rgba(0,0,0,0)'} onPress={this.props.onTabClick}>
        <View style={[styles.headerTabsTextContainer, this.props.selected && styles.headerTabsTextContainerSel]}>
          <Text style={styles.headerTabsText}>{this.props.tabText}</Text>
        </View>
      </TouchableHighlight>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  headerTabsText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerTabsTextContainer: {
    width: TAB_WIDTH,
    height: TAB_HEIGHT,
    flexDirection: 'column',
    justifyContent: 'center',
  }, 
  headerTabsTextContainerSel: {
    borderColor: '#FFFFFF',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
  },
});

CustomTitleBarHeaderTabComp.HeaderTabItem = HeaderTabItem;

export default CustomTitleBarHeaderTabComp;