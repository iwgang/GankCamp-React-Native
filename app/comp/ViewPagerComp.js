import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, ViewPagerAndroid, Platform, Dimensions } from 'react-native';


class ViewPagerComp extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      width: 0,
      height: 0,
      selectedIndex: this.props.selectedIndex,
      initialSelectedIndex: this.props.selectedIndex,
      scrollingTo: null,
    };
    this.handleHorizontalScroll = this._handleHorizontalScroll.bind(this);
    this.adjustCardSize = this._adjustCardSize.bind(this);

    this.screenWidth = Dimensions.get('window').width;
  }

  render() {
    if (Platform.OS === 'ios') {
      return this._renderIOS();
    } else {
      return this._renderAndroid();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      if (Platform.OS === 'ios') {
        this.refs.scrollview.scrollTo({
          x: nextProps.selectedIndex * this.state.width,
          animated: true,
        });
        this.setState({scrollingTo: nextProps.selectedIndex});
      } else {
        this.refs.scrollview.setPage(nextProps.selectedIndex);
        this.setState({selectedIndex: nextProps.selectedIndex});
      }
    }
  }

  _renderIOS() {
    return (
      <ScrollView
        ref="scrollview"
        contentOffset={{
          x: this.state.width * this.state.initialSelectedIndex,
          y: 0,
        }}
        style={[styles.scrollview, this.props.style]}
        horizontal={true}
        pagingEnabled={true}
        bounces={!!this.props.bounces}
        scrollsToTop={false}
        onScroll={this.handleHorizontalScroll}
        scrollEventThrottle={100}
        removeClippedSubviews={true}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLayout={this.adjustCardSize}>
        {this._renderContent()}
      </ScrollView>
    );
  }

  _renderAndroid() {
    return (
      <ViewPagerAndroid
        ref="scrollview"
        initialPage={this.state.initialSelectedIndex}
        onPageSelected={this.handleHorizontalScroll}
        onPageScroll={(event) =>  this.props.onViewPageScroll && this.props.onViewPageScroll(event.nativeEvent.position + event.nativeEvent.offset)}
        style={styles.container}>
        {this._renderContent()}
      </ViewPagerAndroid>
    );
  }

  _adjustCardSize(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }

  _renderContent() {
    let { width, height } = this.state;
    let style = Platform.OS === 'ios' && styles.card;
    return React.Children.map(this.props.children, (child, i) => (
      <View style={[style, {width, height}]} key={'r_' + i}>
        {child}
      </View>
    ));
  }

  _handleHorizontalScroll(event) {
    let selectedIndex = event.nativeEvent.position;
    if (selectedIndex === undefined) {
      selectedIndex = Math.round(
        event.nativeEvent.contentOffset.x / this.state.width,
      );
    }

    if (selectedIndex < 0 || selectedIndex >= this.props.count) {
      return;
    }

    if (this.state.scrollingTo !== null && this.state.scrollingTo !== selectedIndex) {
      return;
    }

    if (this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
      this.setState({selectedIndex, scrollingTo: null});
      const { onSelectedIndexChange } = this.props;
      onSelectedIndexChange && onSelectedIndexChange(selectedIndex);
    }
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'transparent',
  }
});

export default ViewPagerComp;