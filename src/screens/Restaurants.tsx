import React, {Component} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenRestaurants extends AbstractScreen {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return super.render();
  }
}
