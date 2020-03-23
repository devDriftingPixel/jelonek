/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Navigator from './src/navigation/Navigator';
import {BreadProvider} from 'material-bread';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaProvider>
        <BreadProvider>
          <Navigator />
        </BreadProvider>
      </SafeAreaProvider>
    </>
  );
};

export default App;
