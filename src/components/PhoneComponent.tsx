import React from 'react';
import * as Colors from '../utility/Colors';
import {Ripple, Icon} from 'material-bread';
import {Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Utility} from '../utility/Utility';

interface Props {
  phone: string;
}

export class PhoneComponent extends React.Component<Props> {
  render() {
    return (
      <Ripple
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.ACCENT,
          height: 45,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        rippleColor={Colors.PRIMARY}
        onPress={() => Utility.callNumber(this.props.phone)}>
        <Icon
          name={'phone'}
          size={30}
          color={Colors.PRIMARY}
          style={{
            width: 30,
            height: 30,
            marginRight: 20,
          }}
          iconComponent={FontAwesome5}
        />
        <Text style={{color: Colors.PRIMARY, fontSize: 28}}>
          {this.props.phone}
        </Text>
      </Ripple>
    );
  }
}
