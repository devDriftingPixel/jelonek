import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {Appbar} from 'material-bread';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenMainMenu extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  styles = StyleSheet.create({});

  render() {
    return (
      <SafeAreaView>
        <Appbar
          barType={'normal'}
          title={'Tytuł'}
          navigation={'menu'}
          color={'#39A1FF'}
          onNavigation={() => {}}
          actionItems={[]}
        />
      </SafeAreaView>
    );
  }
}
