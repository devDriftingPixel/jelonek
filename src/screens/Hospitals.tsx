import React, {Component} from 'react';
import {Text} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import App from '../../App';
import {AbstractScreen} from './AbstractScreen';
type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenHospitals extends AbstractScreen {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return super.render();
  }
}
