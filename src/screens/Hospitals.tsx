import React from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {ExternalDataService} from '../services/ExternalDataService';
import {ListItem} from '../model/ListItem';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {ExtendedListItemComponent} from '../components/ExtendedListItemComponent';
import {View, Text} from 'react-native';
import * as Colors from '../utility/Colors';
import {Icon, Ripple} from 'material-bread';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {t} from 'i18n-js';
import {Utility} from '../utility/Utility';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenHospitals extends AbstractScreen {
  protected allItems: ListItem[];

  constructor(props: Props) {
    super(props);
    this.allItems = [];
  }

  componentDidMount() {
    this.setState({
      infoVisible: ExternalDataService.getInstance().getAdditionalHospitalInfoVisible(),
    });
    this.getItems();
  }

  getItems() {
    this.allItems = ExternalDataService.getInstance().getHospitals();
    this.setState({
      items: this.allItems,
      progressBarVisible: false,
    });
  }

  protected pageContent = () => {
    return (
      <>
        <FlatList
          data={this.state.items as ListItem[]}
          renderItem={({item}) => (
            <Ripple
              rippleColor={Colors.ACCENT_DARK}
              onPress={() =>
                this.props.navigation!.navigate('ObjectDetails', {
                  item: item,
                  iconName: Utility.iconFromItemType(item.type, item.subType),
                })
              }>
              <ExtendedListItemComponent
                item={item}
                onFavoriteSelected={(item: ListItem) =>
                  this.onFavoriteSelected(item)
                }
                paddingBottom={20}
                maxLines={3}
                fontSize={18}
              />
            </Ripple>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {this.state.infoVisible ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: Colors.PRIMARY,
              position: 'absolute',
              top: 0,
              left: 0,
              marginTop: 100,
            }}>
            <View>
              <Ripple
                style={{
                  width: 40,
                  height: 40,
                  top: 5,
                  right: 5,
                  position: 'absolute',
                }}
                onPress={() => this.handleChangeInfoVisibility()}>
                <Icon
                  name={'close'}
                  size={40}
                  color={Colors.ACCENT}
                  iconComponent={FontAwesome}
                />
              </Ripple>
              <Text style={{color: '#FFF', fontSize: 18, margin: 30}}>
                W związku z zagrożeniem epidemią koronawirusa zostają
                wprowadzone nadzwyczajne rozwiązania dotyczące przyjęć
                pacjentów:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  marginVertical: 10,
                }}>
                <Icon
                  name={'done'}
                  size={25}
                  color={'#FFF'}
                  style={{width: 24, height: 20, marginRight: 5}}
                />
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 17,
                    flex: 1,
                  }}>
                  REJESTRACJA PACJENTÓW TYLKO TELEFONICZNA
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  marginVertical: 10,
                }}>
                <Icon
                  name={'done'}
                  size={25}
                  color={'#FFF'}
                  style={{width: 24, height: 20, marginRight: 5}}
                />
                <Text style={{color: '#FFF', fontSize: 17, flex: 1}}>
                  PACJENTOM UDZIELANE BĘDĄ TELEPORADY W GODZINACH PRACY
                  PRZYCHODNI
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  marginVertical: 10,
                }}>
                <Icon
                  name={'done'}
                  size={25}
                  color={'#FFF'}
                  style={{width: 24, height: 20, marginRight: 5}}
                />
                <Text style={{color: '#FFF', fontSize: 17, flex: 1}}>
                  W SYTUACJI, KIEDY JEST TO NIEZBĘDNE PACJENT ZOSTANIE UMÓWIONY
                  NA KONKRETNĄ GODZINĘ DO LEKARZA I WTEDY MOŻLIWE BĘDZIE WEJŚCIE
                  DO PRZYCHODNI
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  marginVertical: 10,
                }}>
                <Icon
                  name={'done'}
                  size={25}
                  color={'#FFF'}
                  style={{width: 24, height: 20, marginRight: 5}}
                />
                <Text style={{color: '#FFF', fontSize: 17, flex: 1}}>
                  NIE NALEŻY ZGŁASZAĆ SIĘ PO RECEPTY - PROŚBĘ O PRZEPISANIE
                  LEKÓW DO KONTYNUACJI LECZENIA NALEŻY ZGŁOSIĆ TELEFONICZNIE
                </Text>
              </View>
              <Text style={{color: '#FFF', fontSize: 18, margin: 20}}>
                Wszelkie wskazówki zostaną udzielone Państwu w podległej
                przychodni.
              </Text>
            </View>
          </View>
        ) : (
          <Ripple
            style={{
              width: '100%',
              height: 70,
              backgroundColor: Colors.PRIMARY,
              position: 'absolute',
              bottom: 0,
              left: 0,
              marginTop: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.handleChangeInfoVisibility()}>
            <Text style={{color: '#FFF', fontSize: 15, marginBottom: 10}}>
              Zalecenia Ministerstwa Zdrowia
            </Text>
          </Ripple>
        )}
      </>
    );
  };

  private handleChangeInfoVisibility() {
    const dataService = ExternalDataService.getInstance();
    dataService.setAdditionalHospitalInfoVisible(
      !dataService.getAdditionalHospitalInfoVisible(),
    );
    this.setState({
      infoVisible: dataService.getAdditionalHospitalInfoVisible(),
    });
  }

  render() {
    return super.render();
  }
}
