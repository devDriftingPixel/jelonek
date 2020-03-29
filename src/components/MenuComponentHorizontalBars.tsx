import React, {Component} from 'react';
import {
  ImageBackground,
  ScaledSize,
  FlatList,
  Text,
  StyleSheet,
  View,
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

export class MenuComponentHorizontalBars extends Component<Props> {
  private menuItems = [
    {
      name: App.translate('menu_messages'),
      iconName: 'info-circle',
      color: Colors.PRIMARY,
      onPress: () =>
        this.props.navigation!.navigate('Messages', {
          name: App.translate('menu_messages'),
          iconName: 'info-circle',
        }),
    },
    {
      name: App.translate('menu_shops'),
      iconName: 'shopping-cart',
      color: Colors.PRIMARY,
      onPress: () =>
        this.props.navigation!.navigate('Shops', {
          name: App.translate('menu_shops'),
          iconName: 'shopping-cart',
        }),
    },
    {
      name: App.translate('menu_restaurants'),
      iconName: 'hotdog',
      color: Colors.PRIMARY,
      onPress: () =>
        this.props.navigation!.navigate('Restaurants', {
          name: App.translate('menu_restaurants'),
          iconName: 'hotdog',
        }),
    },
    {
      name: App.translate('menu_chemists'),
      iconName: 'first-aid',
      color: Colors.PRIMARY,
      onPress: () =>
        this.props.navigation!.navigate('Chemists', {
          name: App.translate('menu_chemists'),
          iconName: 'first-aid',
        }),
    },
    {
      name: App.translate('menu_hospitals'),
      iconName: 'clinic-medical',
      color: Colors.PRIMARY,
      onPress: () =>
        this.props.navigation!.navigate('Hospitals', {
          name: App.translate('menu_hospitals'),
          iconName: 'clinic-medical',
        }),
    },
    {
      name: App.translate('menu_offices'),
      iconName: 'building',
      color: Colors.PRIMARY,
      onPress: () =>
        this.props.navigation!.navigate('Offices', {
          name: App.translate('menu_offices'),
          iconName: 'building',
        }),
    },
    {
      name: App.translate('menu_phoness'),
      iconName: 'phone',
      color: Colors.PRIMARY,
      onPress: () =>
        this.props.navigation!.navigate('phoness', {
          name: App.translate('menu_phoness'),
          iconName: 'phone',
        }),
    },
    {
      name: App.translate('menu_informations'),
      iconName: 'exclamation',
      color: Colors.PRIMARY,
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
      backgroundColor: '#FFF',
      borderRadius: 10,
      height: 80,
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
      alignItems: 'center',
      flex: 1,
      margin: 10,
      flexDirection: 'row-reverse',
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
          numColumns={1}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <Ripple
              rippleColor={Colors.PRIMARY}
              rippleOpacity={0.8}
              rippleDuration={300}
              rippleContainerBorderRadius={0}
              style={[
                this.styles.projectListItem,
                this.styles.projectListItemVisible,
              ]}
              onPress={item.onPress.bind(this)}>
              <View
                style={{
                  backgroundColor: item.color,
                  width: 70,
                  alignItems: 'flex-end',
                  borderTopLeftRadius: 40,
                }}>
                <Icon
                  name={item.iconName}
                  color={'#FFF'}
                  style={[
                    {marginHorizontal: 10, marginVertical: 15, fontSize: 35},
                  ]}
                  iconComponent={FontAwesome5}
                />
              </View>
              <Text
                style={{
                  color: Colors.PRIMARY,
                  fontSize: 21,
                  textAlign: 'left',
                  flex: 1,
                  marginLeft: 20,
                  fontWeight: 'bold',
                }}>
                {item.name.toUpperCase()}
              </Text>
            </Ripple>
          )}
        />
      </ImageBackground>
    );
  }
}
