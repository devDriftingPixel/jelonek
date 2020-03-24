import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Platform, Animated, StyleSheet} from 'react-native';
import {withTheme, Subtitle} from 'material-bread';
import FrontLayerScrim from './FrontLayerScrim';

const IOS = Platform.OS === 'ios';

interface Props {
  animate?: any;
  initialOffset?: any;
  backLayerRevealed?: any;
  offset?: any;
  window?: any;
  toggleLayout?: any;
  frontLayerStyle?: any;
  backRevealed?: any;
  subheader?: any;
  internalOffsetAnimate?: any;
  isInternalAnimate?: any;
}

class FrontLayer extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }
  static propTypes = {
    offset: PropTypes.number,
    initialOffset: PropTypes.number,
    children: PropTypes.node,
    backLayerRevealed: PropTypes.object,
    frontLayerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    theme: PropTypes.object,
    toggleLayout: PropTypes.func,
    animate: PropTypes.object,
    backRevealed: PropTypes.bool,
    isInternalAnimate: PropTypes.bool,
    internalOffsetAnimate: PropTypes.object,
    window: PropTypes.object,
    subheader: PropTypes.string,
  };

  styles = StyleSheet.create({
    frontLayerContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    subheader: {
      fontSize: 16,
      color: 'rgba(0,0,0,.8)',
      marginLeft: 20,
      marginTop: 16,
    },
  });

  getFrontLayerTranslateY = () => {
    const {animate, initialOffset} = this.props;

    const offset = this.getOffset();
    return animate.interpolate({
      inputRange: [0, 1],
      outputRange: [initialOffset, offset],
    });
  };

  getOffset = (ignoreElement = false) => {
    const {backLayerRevealed, offset, window} = this.props;

    if (!ignoreElement && backLayerRevealed && offset) {
      return offset;
    }

    if (offset) return offset;

    const y = this.getY();

    return window.height - y;
  };

  getY = () => {
    const {initialOffset} = this.props;
    const y = IOS ? 20 : 24;
    return y + initialOffset;
  };

  render() {
    const {
      children,
      toggleLayout,
      animate,
      frontLayerStyle,
      backRevealed,
      subheader,
    } = this.props;

    const translateY = this.getFrontLayerTranslateY();

    return (
      <Animated.View
        style={[
          this.styles.frontLayerContainer,
          frontLayerStyle,
          {transform: [{translateY}]},
        ]}>
        <Subtitle text={subheader} style={this.styles.subheader} />
        {children}
        <FrontLayerScrim
          toggleLayout={() => toggleLayout()}
          animate={animate}
          backRevealed={backRevealed}
        />
      </Animated.View>
    );
  }
}

export default withTheme(FrontLayer);
