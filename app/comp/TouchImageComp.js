import React, { Component, PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';


class TouchImageView extends Component {

	static propTypes = {
 		src: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onLongClick: PropTypes.func,
    ...View.propTypes
	};

  constructor() {
  	super();
    this.onChange = this._onChange.bind(this);
  }

 	render() {
    return <RNTouchImageView {...this.props} onChange={this.onChange} />;
  }

  _onChange(event) {
    let eventType = event.nativeEvent.eventType;
    if (eventType === 'onClick') {
    	this.props.onClick && this.props.onClick();
    } else if (eventType === 'onLongClick') {
			this.props.onLongClick && this.props.onLongClick();
    }
  }
 
}


var RNTouchImageView = requireNativeComponent('RNTouchImageView', TouchImageView, {
	nativeOnly: {onChange: true}
});

export default TouchImageView;