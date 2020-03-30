import React, {Component} from 'react';
import {
  ImageBackground,
  ScaledSize,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import * as Colors from '../utility/Colors';
import * as Images from '../utility/Images';
import {Ripple, Icon} from 'material-bread';
import App from '../../App';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {NavigationStackProp} from 'react-navigation-stack';

interface Props {
  dimension: ScaledSize;
  navigation?: NavigationStackProp;
}

export class MenuComponent extends Component<Props> {
  private menuItems = [
    {
      name: App.translate('menu_messages'),
      iconName: 'info-circle',
      onPress: () =>
        this.props.navigation!.navigate('Messages', {
          name: App.translate('menu_messages'),
          iconName: 'info-circle',
        }),
    },
    {
      name: App.translate('menu_shops'),
      iconName: 'shopping-cart',
      onPress: () =>
        this.props.navigation!.navigate('Shops', {
          name: App.translate('menu_shops'),
          iconName: 'shopping-cart',
        }),
    },
    {
      name: App.translate('menu_restaurants'),
      iconName: 'hotdog',
      onPress: () =>
        this.props.navigation!.navigate('Restaurants', {
          name: App.translate('menu_restaurants'),
          iconName: 'hotdog',
        }),
    },
    {
      name: App.translate('menu_chemists'),
      iconName: 'first-aid',
      onPress: () =>
        this.props.navigation!.navigate('Chemists', {
          name: App.translate('menu_chemists'),
          iconName: 'first-aid',
        }),
    },
    {
      name: App.translate('menu_hospitals'),
      iconName: 'clinic-medical',
      onPress: () =>
        this.props.navigation!.navigate('Hospitals', {
          name: App.translate('menu_hospitals'),
          iconName: 'clinic-medical',
        }),
    },
    {
      name: App.translate('menu_offices'),
      iconName: 'building',
      onPress: () =>
        this.props.navigation!.navigate('Offices', {
          name: App.translate('menu_offices'),
          iconName: 'building',
        }),
    },
    {
      name: App.translate('menu_phones'),
      iconName: 'phone',
      onPress: () =>
        this.props.navigation!.navigate('phones', {
          name: App.translate('menu_phones'),
          iconName: 'phone',
        }),
    },
    {
      name: App.translate('menu_informations'),
      iconName: 'exclamation',
      onPress: () =>
        this.props.navigation!.navigate('Informations', {
          name: App.translate('menu_informations'),
          iconName: 'exclamation',
        }),
    },
  ];

  styles = StyleSheet.create({
    container: {},
    body: {},

    projectListItemVisible: {
      backgroundColor: Colors.PRIMARY,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      elevation: 9,
    },
    projectListItem: {
      height: 170,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      margin: 15,
    },
    flipx: {
      transform: [{scaleX: -1}],
    },
  });

  public render() {
    return (
      <ImageBackground
        source={Images.MAIN_MENU_BACKGROUND}
        style={{
          width: this.props.dimension.width,
          height: this.props.dimension.height,
          borderRadius: 20,
        }}
        imageStyle={{borderRadius: 18}}>
        <FlatList
          style={{
            marginLeft: 8,
            marginRight: 8,
            height: '90%',
            marginBottom: 80,
          }}
          data={this.menuItems}
          numColumns={2}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <Ripple
              rippleColor={Colors.ACCENT}
              rippleOpacity={0.8}
              rippleDuration={300}
              rippleContainerBorderRadius={20}
              style={[
                this.styles.projectListItem,
                this.styles.projectListItemVisible,
              ]}
              onPress={item.onPress.bind(this)}>
              <Icon
                name={item.iconName}
                color={'#FFF'}
                style={[{margin: 10, fontSize: 65}]}
                iconComponent={FontAwesome5}
              />
              <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
                {item.name.toUpperCase()}
              </Text>
            </Ripple>
          )}
        />
      </ImageBackground>
    );
  }
}
