import React, {Component} from 'react';
import {Text} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';

import {SafeAreaView} from 'react-native-safe-area-context';
import App from '../../App';
import {AbstractScreen} from './AbstractScreen';
type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenPhones extends AbstractScreen {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return super.render();
  }
}
