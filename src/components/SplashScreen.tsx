import React from 'react';
import {withTheme} from 'material-bread';
import {GestureResponderEvent, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {}

export default class SplashScreen extends React.Component<Props> {
  render() {
    return (
      <SafeAreaView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading View </Text>
        </View>
      </SafeAreaView>
    );
  }
}
