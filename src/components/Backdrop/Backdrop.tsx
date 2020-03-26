import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Animated,
  Easing,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {withTheme, Icon, Ripple, SheetSide} from 'material-bread';
import HeaderButton from './HeaderButton';
import FrontLayer from './FrontLayer';
import BackLayer from './BackLayer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Analytics from 'appcenter-analytics';
import * as Enums from '../../model/Enums';
import * as UtilityStylus from '../../utility/UstilityStyles';
import App from '../../../App';
import {AboutApp} from '../AboutApp';

interface Props {
  backLayerStyle?: any;
  headerButtonStyle?: any;
  frontLayerStyle?: any;
  children?: any;
  initialOffset?: any;
  offset?: any;
  backLayerRevealed?: any;
  backLayerConcealed?: any;
  theme?: any;
  subheader?: any;
  testID?: any;
}

class Backdrop extends PureComponent<Props> {
  static propTypes = {
    backLayerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    frontLayerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    headerButtonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    backLayerConcealed: PropTypes.node,
    offset: PropTypes.number,
    initialOffset: PropTypes.number,
    children: PropTypes.node,
    backLayerRevealed: PropTypes.node,
    theme: PropTypes.object,
    subheader: PropTypes.string,
    testID: PropTypes.string,
  };

  static defaultProps = {
    initialOffset: 56,
    buttonRippleColor: 'rgba(255,255,255,0.3)',
  };

  state = {
    backConcealed: false,
    backRevealed: false,
    window: Dimensions.get('window'),
    iconName: '',
    sheetSideVisible: false,
  };

  styles = StyleSheet.create({
    backLayerContainer: {
      flex: 1,
    },
    flipX: {
      transform: [{scaleX: -1}],
    },
  });

  constructor(props: any) {
    super(props);
    const window = Dimensions.get('window');
    this.state = {
      window: window,
      backConcealed: true,
      backRevealed: false,
      iconName: 'favorite',
      sheetSideVisible: false,
    };
  }

  animate = new Animated.Value(0);
  internalAnimate = new Animated.Value(0);
  internalOffsetAnimate = new Animated.Value(0);
  isInternalAnimate = false;

  toggleLayout() {
    const {backConcealed} = this.state;

    if (backConcealed) {
      Analytics.trackEvent('Open Favorite panel on MainMenu', {
        Category: Enums.AnaliticsCategories.NAVIGATION,
      });
      this.setState({backRevealed: true, iconName: 'close'});
    } else {
      Analytics.trackEvent('Close Favorite panel on MainMenu', {
        Category: Enums.AnaliticsCategories.NAVIGATION,
      });
      this.setState({backConcealed: true, iconName: 'favorite'});
    }

    this.isInternalAnimate = false;
    ``;
    Animated.timing(this.animate, {
      toValue: backConcealed ? 1 : 0,
      duration: 196,
      easing: Easing.ease,
    }).start(() => {
      if (backConcealed) {
        this.setState({backConcealed: false});
      } else {
        this.setState({
          backRevealed: false,
        });
      }
    });
  }

  render() {
    const {
      backLayerStyle,
      headerButtonStyle,
      frontLayerStyle,
      children,
      initialOffset,
      offset,
      backLayerRevealed,
      backLayerConcealed,
      theme,
      subheader,
      testID,
    } = this.props;
    const {backConcealed, backRevealed, window, iconName} = this.state;

    return (
      <SafeAreaView
        style={[
          this.styles.backLayerContainer,
          {backgroundColor: theme.primary.main},
          backLayerStyle,
        ]}
        testID={testID}>
        <BackLayer
          backLayerConcealed={backLayerConcealed}
          animate={this.animate}
          internalAnimate={this.internalAnimate}
          backConcealed={backConcealed}
          backLayerRevealed={backLayerRevealed}
          backRevealed={backRevealed}
        />
        <FrontLayer
          toggleLayout={() => this.toggleLayout()}
          animate={this.animate}
          frontLayerStyle={frontLayerStyle}
          initialOffset={initialOffset}
          window={window}
          offset={offset}
          backRevealed={backRevealed}
          backLayerRevealed={backLayerRevealed}
          internalOffsetAnimate={this.internalOffsetAnimate}
          isInternalAnimate={this.isInternalAnimate}
          subheader={subheader}>
          {children}
        </FrontLayer>
        <SheetSide
          visible={this.state.sheetSideVisible}
          onBackdropPress={() => this.setState({sheetSideVisible: false})}
          onSwipeRight={() => this.setState({sheetSideVisible: false})}
          side={'left'}
          duration={320}>
          <AboutApp />
        </SheetSide>
        <Ripple
          style={{
            height: 56,
            width: 56,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 5,
          }}
          rippleContainerBorderRadius={28}>
          <Icon
            name={'bullhorn'}
            size={34}
            color="white"
            style={[UtilityStylus.styles.flipX, {marginTop: -2}]}
            iconComponent={MaterialCommunityIcons}
          />
        </Ripple>
        <HeaderButton
          backConcealed={backConcealed}
          headerButtonStyle={headerButtonStyle}
          toggleLayout={() => {
            this.toggleLayout();
          }}
          iconName={iconName}
          right={60}
        />
        <Ripple
          style={{
            height: 56,
            width: 56,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
          }}
          rippleContainerBorderRadius={28}
          onPress={() => this.setState({sheetSideVisible: true})}>
          <Icon
            name={'bars'}
            size={24}
            color="white"
            style={{}}
            iconComponent={FontAwesome}
          />
        </Ripple>
      </SafeAreaView>
    );
  }
}

export default withTheme(Backdrop);
