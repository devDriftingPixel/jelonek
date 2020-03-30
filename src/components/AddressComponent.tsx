import React from 'react';
import * as Colors from '../utility/Colors';
import {Icon} from 'material-bread';
import {ListItem} from '../model/ListItem';
import {View, Text} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

interface Props {
  item: ListItem;
}

export class AddressComponent extends React.Component<Props> {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
        <Icon
          name={'location'}
          size={55}
          color={Colors.PRIMARY}
          style={{width: 45, height: 45, marginRight: 20}}
          iconComponent={EvilIcons}
        />
        <Text style={{color: Colors.PRIMARY, fontSize: 16}}>
          {this.props.item.address}
        </Text>
      </View>
    );
  }
}
