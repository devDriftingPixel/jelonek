import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated, Easing, StyleSheet} from 'react-native';
import {Icon, Ripple, withTheme} from 'material-bread';
import * as Colors from '../../utility/Colors';

interface Props {
  backConcealed: any;
  toggleLayout: any;
  headerButtonStyle: any;
  iconName: any;
  left?: number;
  right?: number;
}

class HeaderButton extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  static propTypes = {
    headerButtonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    toggleLayout: PropTypes.func,
    backConcealed: PropTypes.bool,
    iconName: PropTypes.string,
  };

  styles = StyleSheet.create({
    container: {
      height: 56,
      width: 56,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: this.props.left,
      right: this.props.right,
    },
    ripple: {
      height: 56,
      width: 56,
      justifyContent: 'center',
    },
    icon: {
      alignSelf: 'center',
    },
  });

  spinValue = new Animated.Value(0);

  _handleSpin() {
    const {backConcealed, toggleLayout} = this.props;
    toggleLayout();
    Animated.timing(this.spinValue, {
      toValue: 0.5,
      duration: 94,
      easing: Easing.linear,
    }).start(() => {
      Animated.timing(this.spinValue, {
        toValue: backConcealed ? 1 : 0,
        duration: 94,
        easing: Easing.linear,
      }).start();
    });
  }

  render() {
    const {headerButtonStyle, iconName} = this.props;

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '0deg'],
    });
    const style = [
      this.styles.container,
      headerButtonStyle,
      {transform: [{rotate: spin}]},
    ];

    return (
      <Animated.View style={style}>
        <Ripple
          rippleContainerBorderRadius={100}
          rippleColor={'transparent'}
          onPress={() => this._handleSpin()}
          style={this.styles.ripple}>
          <Icon
            name={iconName}
            size={32}
            color="white"
            style={[this.styles.icon]}
          />
        </Ripple>
      </Animated.View>
    );
  }
}

export default withTheme(HeaderButton);
