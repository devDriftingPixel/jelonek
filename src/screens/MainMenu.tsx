import React, {Component} from 'react';
import {Text, StyleSheet, View, Animated, ViewStyle} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';

import {SafeAreaView} from 'react-native-safe-area-context';
import * as Colors from '../utility/Colors';
import {Avatar, IconButton, Icon} from 'material-bread';
import Backdrop from '../components/Backdrop/Backdrop';

import App from '../../App';
import {ZeroFavorites} from '../components/ZeroFavorites';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenMainMenu extends Component {
  render() {
    const styles = {
      container: {
        flex: 1,
        paddingTop: 30,
        color: 'red',
      },
      backdropHeader: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
      },
      backdropHeaderTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: '500',
        marginLeft: 72,
      },
    };

    const backLayerRevealed = (
      <View style={{width: '100%', flex: 1, backgroundColor: Colors.PRIMARY}}>
        <View style={styles.backdropHeader as ViewStyle}>
          <Text style={styles.backdropHeaderTitle as ViewStyle}>
            {App.translate('favorite')}
          </Text>
        </View>
        <ZeroFavorites />
      </View>
    );

    const album = (
      <Avatar
        type="icon"
        content="album"
        contentColor={'#ececec'}
        color={'#a3a3a3'}
        size={40}
      />
    );
    const iconFav = <IconButton name="favorite" size={24} color="#6e6e6e" />;

    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{marginBottom: 80, flex: 1, backgroundColor: Colors.PRIMARY}}>
          <Backdrop
            subheader={'Music'}
            backLayerConcealed={
              <View style={styles.backdropHeader as ViewStyle}>
                <Text style={styles.backdropHeaderTitle as ViewStyle}>App</Text>
              </View>
            }
            backLayerStyle={{backgroundColor: Colors.PRIMARY}}
            // frontLayerStyle={{backgroundColor: Colors.ACCENT}}
            // headerButtonStyle={{backgroundColor: Colors.DISACTIVE}}
            backLayerRevealed={backLayerRevealed}>
            <View style={styles.container}>
              <Text style={{color: 'red'}}>Test</Text>
            </View>
          </Backdrop>
        </View>
      </SafeAreaView>
    );
  }
}
