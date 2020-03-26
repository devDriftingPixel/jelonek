import React from 'react';
import {Text} from 'react-native';
import {Icon, Ripple} from 'material-bread';
import * as Colors from '../utility/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Props {
  item: {iconName: string; name: string; onPress: Function};
  index: number;
  active?: boolean;
  onSelect: Function;
}

export class BottomNavigationItem extends React.Component<Props> {
  render() {
    return (
      <Ripple
        rippleDuration={100}
        rippleColor={Colors.ACCENT}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: this.props.active ? Colors.ACCENT : Colors.PRIMARY,
        }}
        onPress={() =>
          this.props.onSelect(this.props.active ? -1 : this.props.index)
        }>
        <Icon
          name={this.props.item.iconName}
          size={this.props.active ? 21 : 17}
          color={
            this.props.active ? Colors.PRIMARY : Colors.BOOTOM_FILTER_ICON_COLOR
          }
          // style={{width: 24, height: 20, marginRight: 5}}
          iconComponent={FontAwesome5}
        />
        <Text
          style={{
            color: this.props.active
              ? Colors.PRIMARY
              : Colors.BOOTOM_FILTER_ICON_COLOR,
            fontSize: 14,
            marginTop: 3,
          }}>
          {this.props.item.name}
        </Text>
      </Ripple>
    );
  }
}
