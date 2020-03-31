import React, {Fragment} from 'react';
import {StyleSheet, Animated} from 'react-native';
import PropTypes from 'prop-types';
import {withTheme} from 'material-bread';

interface Props {
  backLayerConcealed?: any;
  backLayerRevealed?: any;
  backRevealed?: any;
  animate?: any;
  internalAnimate?: any;
  backConcealed?: any;
}

class BackLayer extends React.Component<Props> {
  static propTypes = {
    backLayerConcealed: PropTypes.node,
    backLayerRevealed: PropTypes.node,
    backRevealed: PropTypes.bool,
    animate: PropTypes.object,
    internalAnimate: PropTypes.object,
  };

  styles = StyleSheet.create({
    backLayer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%',
    },
  });

  renderBackLayerConcealed = () => {
    const {backLayerConcealed, backRevealed, animate} = this.props;

    if (!backLayerConcealed || backRevealed) {
      return null;
    }
    const md = backRevealed ? 0 : 1;
    const opacity = animate.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [1, md, 0],
    });

    return <Animated.View></Animated.View>;
  };

  renderBackLayerRevealed = () => {
    const {backLayerRevealed, backRevealed, animate} = this.props;
    if (!backLayerRevealed || !backRevealed) {
      return null;
    }
    const md = backRevealed ? 1 : 0;
    const opacity = animate.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [0, md, 1],
    });

    return (
      <Animated.View style={[this.styles.backLayer, {opacity}]}>
        {this.renderBackElements()}
      </Animated.View>
    );
  };

  renderBackElements = () => {
    const {backLayerRevealed, internalAnimate} = this.props;

    const opacity = internalAnimate.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1],
    });

    return (
      <Animated.View style={{height: 500, opacity}}>
        {backLayerRevealed}
      </Animated.View>
    );
  };

  render() {
    return (
      <Fragment>
        {this.renderBackLayerConcealed()}
        {this.renderBackLayerRevealed()}
      </Fragment>
    );
  }
}

export default withTheme(BackLayer);
