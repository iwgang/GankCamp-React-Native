import React, { Component } from 'react';
import { StyleSheet, View, Modal, PickerIOS, TouchableHighlight } from 'react-native';

import OvalButtonComp from './OvalButtonComp';
import { COMMON_BACKGROUND_COLOR, TITLE_BAR_HEIGHT } from '../GlobalConst';


class HstoryDaySelectorComp extends Component {

  constructor(props) {
    super(props);

    this.hideMode = this._hideMode.bind(this);

    this.state = {
      visible: false,
      selDay: null,
      dataSource: null,
    };
  }

  render() {
  	let contentView;
  	if (null !== this.state.dataSource && this.state.dataSource.length > 0) {
  	  contentView = (
  	  	<View style={styles.contentViewStyle}>
          <PickerIOS 
            style={{height: 230}}
            selectedValue={this.state.selDay}
            animationType="fade"
            onValueChange={(itemValue, itemPosition) => this.setState({selDay: itemValue})}>
            {this.state.dataSource.map((day, index) => {
              return (
                <PickerIOS.Item key={index} label={'第' + day + '期'} value={day} />    
              );
            })}
          </PickerIOS>

          <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <OvalButtonComp onPress={this.hideMode}>取消</OvalButtonComp>
            </View>

            <View style={{flex: 1, alignItems: 'center'}}>
              <OvalButtonComp onPress={this._onSelected.bind(this)}>选择</OvalButtonComp>
            </View>
          </View>
        </View>
  	  );
  	}
    return (
      <Modal 
        transparent={true}
        style={{flex: 1}}
        visible={this.state.visible}
        onRequestClose={this.hideMode} >
        {contentView}
        <TouchableHighlight style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}} underlayColor="rgba(0,0,0,0)" onPress={this.hideMode}>
          <View />
        </TouchableHighlight>
      </Modal>
    );
  }

  show(dataSource, defSelDay) {
  	this.setState({
  	  visible: true,
      selDay: defSelDay,
  	  dataSource,
  	});
  }

  _hideMode() {
  	this.setState({visible: false});
  }

  _onSelected(selDay) {
  	this.hideMode();
  	this.props.onSelected && this.props.onSelected(this.state.selDay);
  }

}


const styles = StyleSheet.create({
  contentViewStyle: {
    backgroundColor: COMMON_BACKGROUND_COLOR,
    marginTop: TITLE_BAR_HEIGHT + 20,
  },
});

export default HstoryDaySelectorComp;