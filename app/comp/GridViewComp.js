import React, { Component } from 'react';
import { StyleSheet, View, ListView } from 'react-native';


class GridView extends Component {

  groupItems(items, itemsPerRow) {
    var itemsGroups = [];
    var group = [];

    items.forEach(function(item) {
      if (group.length === itemsPerRow) {
        itemsGroups.push(group);
        group = [item];
      } else {
        group.push(item);
      }
    });

    if (group.length > 0) {
      itemsGroups.push(group);
    }

    return itemsGroups;
  }

  _renderGroup(group) {
    var that = this;
    var items = group.map(function(item, index) {
      return that.props.renderItem(item, index);
    });
    return (
      <View style={styles.group}>
        {items}
      </View>
    );
  }

  render() {
    var groups = this.groupItems(this.props.items, this.props.itemsPerRow);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <ListView
        {...this.props}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
        renderRow={this._renderGroup.bind(this)}
        dataSource={ds.cloneWithRows(groups)}
      />
    );
  }

}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});


export default GridView;