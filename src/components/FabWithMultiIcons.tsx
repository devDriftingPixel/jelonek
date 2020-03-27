import React from 'react';
import * as Colors from '../utility/Colors';
import {Ripple, Icon, withTheme} from 'material-bread';
import {Text, Animated, View} from 'react-native';

interface Props {
  // onPress: (event: GestureResponderEvent) => void;
  iconName: string;
  iconColor: string;
  color: string;
  actions: {iconName: string; content: string; onPress: Function}[];
}

export class FabWithMultiIcons extends React.Component<Props> {
  private fadeInAnimationConfig: Animated.CompositeAnimation;
  private fadeOutAnimationConfig: Animated.CompositeAnimation;
  private goInAnimationConfig: Animated.CompositeAnimation;
  private goOutAnimationConfig: Animated.CompositeAnimation;

  state = {
    actionsVisible: false,
    fadeAnim: new Animated.Value(0),
    position: new Animated.Value(-300),
  };

  constructor(props: Props) {
    super(props);
    this.fadeInAnimationConfig = Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 900,
    });
    this.fadeOutAnimationConfig = Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 300,
    });

    this.goInAnimationConfig = Animated.timing(this.state.position, {
      toValue: 5,
      duration: 700,
    });

    this.goOutAnimationConfig = Animated.timing(this.state.position, {
      toValue: -300,
      duration: 300,
    });
  }

  private onMainButtonPress() {
    if (this.state.actionsVisible) {
      this.fadeOutAnimationConfig.start();
      this.goOutAnimationConfig.start();
    } else {
      this.fadeInAnimationConfig.start();
      this.goInAnimationConfig.start();
    }
    this.setState({actionsVisible: !this.state.actionsVisible});
  }

  render() {
    let currentBottomPosition = 5;
    console.log(this.state.fadeAnim, this.state.position);
    return (
      <>
        <Ripple
          style={{
            borderWidth: 1,
            borderColor: Colors.ACCENT,
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            position: 'absolute',
            bottom: currentBottomPosition,
            right: 5,
            height: 60,
            backgroundColor: Colors.ACCENT,
            borderRadius: 100,
            zIndex: 100,
          }}
          onPress={this.onMainButtonPress.bind(this)}
          rippleContainerBorderRadius={35}
          rippleColor={this.props.color}>
          <Icon
            name={this.props.iconName}
            size={33}
            color={this.props.iconColor}
          />
        </Ripple>
        {this.props.actions.map((action: any, index: number) => {
          return (
            <Ripple
              key={index.toString()}
              onPress={action.onPress}
              rippleContainerBorderRadius={35}
              rippleColor={this.props.color}
              style={{
                borderColor: Colors.ACCENT,
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 50,
                position: 'absolute',
                bottom: currentBottomPosition + (index + 1) * 70 - index * 10,
                right: this.state.position,
                height: 50,
                borderRadius: 100,
                zIndex: 100,
              }}>
              <Animated.View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: this.state.fadeAnim,
                  backgroundColor: Colors.ACCENT,
                  borderRadius: 100,
                }}>
                <Icon
                  name={this.props.iconName}
                  size={30}
                  color={this.props.iconColor}
                  style={{marginLeft: 10}}
                />
                <Text
                  style={{
                    margin: 10,
                    color: this.props.iconColor,
                    fontSize: 18,
                  }}>
                  {action.content}
                </Text>
              </Animated.View>
            </Ripple>
          );
        })}
      </>
    );
  }
}
