import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {ScreenMainMenu} from '../screens/MainMenu';

const stack = createStackNavigator({
  Login: {
    screen: ScreenMainMenu,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(
  createSwitchNavigator({
    Stack: stack,
  }),
);
