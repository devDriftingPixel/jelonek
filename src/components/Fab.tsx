import React from 'react';
import * as Colors from '../utility/Colors';
import {Ripple, Icon, withTheme} from 'material-bread';
import {GestureResponderEvent} from 'react-native';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  iconName: string;
  iconColor: string;
  color: string;
}

export class Fab extends React.Component<Props> {
  render() {
    return (
      <Ripple
        style={{
          borderWidth: 1,
          borderColor: Colors.ACCENT,
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          position: 'absolute',
          bottom: 5,
          right: 5,
          height: 60,
          backgroundColor: Colors.ACCENT,
          borderRadius: 100,
          zIndex: 100,
        }}
        onPress={this.props.onPress}
        rippleContainerBorderRadius={35}
        rippleColor={this.props.color}>
        <Icon
          name={this.props.iconName}
          size={33}
          color={this.props.iconColor}
        />
      </Ripple>
    );
  }
}

export default withTheme(Fab);
