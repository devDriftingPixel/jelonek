import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Icon, withTheme} from 'material-bread';

interface Props {
  backRevealed: any;
  toggleLayout: any;
  animate: any;
}

class FrontLayerScrim extends Component<Props> {
  static propTypes = {
    backRevealed: PropTypes.bool,
    toggleLayout: PropTypes.func,
    animate: PropTypes.object,
  };

  styles = StyleSheet.create({
    scrimLayer: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    scrimLayerIcon: {
      position: 'absolute',
      top: 12,
      right: 16,
    },
  });

  render() {
    const {backRevealed, toggleLayout, animate} = this.props;

    if (!backRevealed) return null;

    return (
      <TouchableWithoutFeedback onPress={() => toggleLayout()}>
        <Animated.View style={[this.styles.scrimLayer, {opacity: animate}]}>
          <Icon
            name="expand-less"
            size={24}
            color="rgba(0,0,0,0.56)"
            style={this.styles.scrimLayerIcon}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default withTheme(FrontLayerScrim);
