import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {ScreenMainMenu} from '../screens/MainMenu';
import {ScreenShops} from '../screens/Shops';
import {ScreenRestaurants} from '../screens/Restaurants';
import {ScreenHospitals} from '../screens/Hospitals';
import {ScreenMessages} from '../screens/Messages';
import {ScreenInformations} from '../screens/Informations';
import {ScreenPhones} from '../screens/Phones';
import {ScreenChemists} from '../screens/Chemists';
import {ScreenOffices} from '../screens/Offices';

const stack = createStackNavigator({
  Login: {
    screen: ScreenMainMenu,
    navigationOptions: {
      headerShown: false,
    },
  },
  Shops: {
    screen: ScreenShops,
    navigationOptions: {
      headerShown: false,
    },
  },
  Restaurants: {
    screen: ScreenRestaurants,
    navigationOptions: {
      headerShown: false,
    },
  },
  Hospitals: {
    screen: ScreenHospitals,
    navigationOptions: {
      headerShown: false,
    },
  },
  Messages: {
    screen: ScreenMessages,
    navigationOptions: {
      headerShown: false,
    },
  },
  Informations: {
    screen: ScreenInformations,
    navigationOptions: {
      headerShown: false,
    },
  },
  Telephones: {
    screen: ScreenPhones,
    navigationOptions: {
      headerShown: false,
    },
  },
  Chemists: {
    screen: ScreenChemists,
    navigationOptions: {
      headerShown: false,
    },
  },
  Offices: {
    screen: ScreenOffices,
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
