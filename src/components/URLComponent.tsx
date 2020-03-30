import React from 'react';
import * as Colors from '../utility/Colors';
import {Ripple, Icon, withTheme} from 'material-bread';
import {View, Text, GestureResponderEvent} from 'react-native';

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  iconName: string;
  iconComponent?: React.Component;
  content: string;
}

export class URLComponent extends React.Component<Props> {
  render() {
    return (
      <Ripple onPress={this.props.onPress} rippleColor={Colors.ACCENT}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 40,
              height: 43,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={this.props.iconName}
              size={40}
              color={Colors.PRIMARY}
              style={{}}
              iconComponent={this.props.iconComponent}
            />
          </View>
          <View style={{marginLeft: 5}}>
            <Text style={{fontSize: 15, color: Colors.DARK_TEXT}}>
              {this.props.content}
            </Text>
          </View>
        </View>
      </Ripple>
    );
  }
}
