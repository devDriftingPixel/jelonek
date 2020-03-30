import React from 'react';
import * as Colors from '../utility/Colors';
import {Ripple, Icon, withTheme} from 'material-bread';
import {Linking, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Analytics from 'appcenter-analytics';
import * as Enums from '../model/Enums';
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
          height: 50,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        rippleColor={Colors.PRIMARY}
        onPress={() => {
          Linking.openURL(`tel:${this.props.phone}`).catch(error =>
            Analytics.trackEvent(`Error during calling: ${this.props.phone}`, {
              Category: Enums.AnalyticsCategories.FAIL,
            }),
          );
        }}>
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
        <Text style={{color: Colors.PRIMARY, fontSize: 30}}>
          {this.props.phone}
        </Text>
      </Ripple>
    );
  }
}
