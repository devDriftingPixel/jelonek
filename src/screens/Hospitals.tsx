import React from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {ExternalDataService} from '../services/ExternalDataService';
import {ListItem} from '../model/ListItem';
import {
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native-gesture-handler';
import {ExtendedListItemComponent} from '../components/ExtendedListItemComponent';
import {View, Text} from 'react-native';
import * as Colors from '../utility/Colors';
import {Icon, Ripple} from 'material-bread';
import {Utility} from '../utility/Utility';
import RestService from '../services/RestService';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NetworkService from '../services/NetworkService';

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
    });

    if (!NetworkService.getInstance().isConnected()) {
      this.setState({progressBarVisible: false});
      return;
    }

    if (
      Date.now() -
        ExternalDataService.getInstance()
          .getHospitalsLastUpdate()
          .getTime() <
      60 * 60 * 1000
    ) {
      this.setState({progressBarVisible: false});
      return;
    }

    RestService.getInstance()
      .updateHospitals()
      .then((response: Response) => {
        return response.text();
      })
      .then((textUpdateData: string) => {
        const lastUpdateDbDate = new Date(textUpdateData);
        const lastUpdateLocalDate = ExternalDataService.getInstance()
          .getHospitalsLastUpdate()
          .getTime();

        const difference = lastUpdateDbDate.getTime() - lastUpdateLocalDate;
        if (difference > 0) {
          return RestService.getInstance().getHospitals();
        } else {
          ExternalDataService.getInstance().updateHospitalsLastUpdate();
          this.setState({progressBarVisible: false});
          return {then: () => {}};
        }
      })
      .then((response: Response) => {
        return response.text();
      })
      .then((jsonItemsData: string) => {
        const newItemData = JSON.parse(jsonItemsData);
        ExternalDataService.getInstance().updateHospitals(newItemData);
        this.getItems();
      })
      .catch((error: any) => {
        console.error(error);
        this.setState({progressBarVisible: false});
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
            }}>
            <View>
              <ScrollView style={{height: '100%'}}>
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
                    W SYTUACJI, KIEDY JEST TO NIEZBĘDNE PACJENT ZOSTANIE
                    UMÓWIONY NA KONKRETNĄ GODZINĘ DO LEKARZA I WTEDY MOŻLIWE
                    BĘDZIE WEJŚCIE DO PRZYCHODNI
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
                <View style={{height: 30}} />
              </ScrollView>
            </View>
          </View>
        ) : (
          <Ripple
            style={{
              width: '100%',
              height: 80,
              backgroundColor: Colors.PRIMARY,
              position: 'absolute',
              bottom: 0,
              left: 0,

              alignItems: 'center',
            }}
            onPress={() => this.handleChangeInfoVisibility()}>
            <Icon
              size={25}
              name={'chevron-up'}
              color={Colors.ACCENT}
              iconComponent={FontAwesome5}
            />
            <Text style={{color: '#FFF', fontSize: 15}}>
              Zalecenia Ministerstwa Zdrowia
            </Text>
          </Ripple>
        )}
      </>
    );
  };

  protected handleChangeInfoVisibility() {
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
