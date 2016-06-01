/**
 * 启动页面
 * Created by iWgang on 16/06/01.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated} from 'react-native';

import { APP_MAIN_COLOR } from './GlobalConst';


class SplashPage extends Component {

	constructor(props) {
    super(props);

    this.state = {
    	fadeAnim: new Animated.Value(0),
    	fadeAnimOther: new Animated.Value(0),
    	fadeAnimContainer: new Animated.Value(1),
  	};
  }

  componentDidMount() {
  	this._inAnim(() => {
  	  setTimeout(() => {
      	this._outAnim(() => this.props.onAnimEnd && this.props.onAnimEnd());
    	}, 1000);
  	});
	}

  render() {
  	let transformTitle2 = [
  		{
  			translateX: this.state.fadeAnimOther.interpolate({inputRange: [0, 1], outputRange: [50, 0]}),
  		}
  	];

  	let transformTitle3 = [
  		{
  			translateY: this.state.fadeAnimOther.interpolate({inputRange: [0, 1], outputRange: [150, 0]}),
  		}
  	];
    return (
    	<Animated.View style={[styles.container, this.props.style, {opacity: this.state.fadeAnimContainer}]}>
        <Animated.View style={{opacity: this.state.fadeAnim}}>
      	  <Text style={styles.text1}>Gank.io</Text>
      	</Animated.View>

        <Animated.View style={{opacity: this.state.fadeAnimOther, transform: transformTitle2}}>
      	  <Text style={styles.text2}>干货集中营</Text>
      	</Animated.View>

      	<Animated.View style={{opacity: this.state.fadeAnimOther, transform: transformTitle3}}>
      	  <Text style={styles.text3}>每日分享妹子图和技术干货</Text>
      	</Animated.View>
      </Animated.View>
    );
  }

  _inAnim(callback) {
  	Animated.sequence([
  		Animated.timing(this.state.fadeAnim,  {
    		toValue: 1,
    		duration: 1000,
    	}),
    	Animated.timing(this.state.fadeAnimOther,  {
    		toValue: 1,
    		duration: 500,
    	}),
  	]).start(() => callback && callback()); 
  }

  _outAnim(callback) {
  	Animated.sequence([
  		Animated.timing(this.state.fadeAnim,  {
    		toValue: 0,
    		duration: 1000,
    	}),
    	Animated.timing(this.state.fadeAnimOther,  {
    		toValue: 0,
    		duration: 500,
    	}),
    	Animated.timing(this.state.fadeAnimContainer,  {
    		toValue: 0,
    		duration: 500,
    	}),
  	]).start(() => callback && callback()); 
  }

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: APP_MAIN_COLOR,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text1: {
		color: '#FFFFFF',
		fontSize: 28,
		fontWeight: 'bold',
	},
	text2: {
		color: '#D3D3D3',
		fontSize: 15,
	},
	text3: {
		color: '#D3D3D3',
		fontSize: 18,
		marginTop: 30,
	}
});


export default SplashPage;