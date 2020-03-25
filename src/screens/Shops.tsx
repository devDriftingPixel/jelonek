import React, {Component} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenShops extends AbstractScreen {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return super.render();
  }
}
