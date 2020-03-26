import React from 'react';
import * as Colors from '../utility/Colors';
import {View} from 'react-native';
import {BottomNavigationItem} from './BottomNavigationItem';
import {Amenities} from '../model/Enums';

interface Props {
  actions: {
    iconName: string;
    name: string;
    onPress: Function;
    returnData: any;
  }[];
  onSelectionChange: Function;
}

export class BottomNavigation extends React.Component<Props> {
  state = {activeIndex: -1};
  render() {
    return (
      <View
        style={{
          width: '100%',
          height: 55,
          backgroundColor: Colors.PRIMARY,
          flexDirection: 'row',
        }}>
        {this.props.actions.map((actionItem, index) => (
          <BottomNavigationItem
            key={index}
            index={index}
            item={actionItem}
            active={this.state.activeIndex == index}
            onSelect={(selectedItemIndex: number) =>
              this.onSelect(selectedItemIndex)
            }
          />
        ))}
      </View>
    );
  }
  onSelect(selectedItemIndex: number) {
    this.setState({activeIndex: selectedItemIndex});
    this.props.onSelectionChange(
      selectedItemIndex == -1
        ? undefined
        : this.props.actions[selectedItemIndex].returnData,
    );
  }
}
