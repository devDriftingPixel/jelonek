import React, {Component} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {Text, SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import {ListItem} from '../model/ListItem';
import {Appbar, Card} from 'material-bread';
import * as Colors from '../utility/Colors';
import {Fab} from '../components/Fab';
import {Linking} from 'react-native';
import {FabWithMultiIcons} from '../components/FabWithMultiIcons';
import {OpenHours} from '../components/OpenHours';
import {URLComponent} from '../components/URLComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import App from '../../App';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenObjectDetails extends Component<Props> {
  private item: ListItem;

  constructor(props: Props) {
    super(props);
    const {params} = this.props.navigation!.state;
    this.item = params!.item;
  }

  render() {
    const styles = StyleSheet.create({
      actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
    });

    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar
          barType={'normal'}
          color={Colors.PRIMARY}
          title={this.item.name}
          navigation={'arrow-back'}
          onNavigation={() => this.props.navigation?.goBack()}
        />

        <Card style={{flex: 1, margin: 15, zIndex: 1}}>
          <ScrollView>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: Colors.PRIMARY,
                  fontWeight: 'bold',
                }}>
                {this.item.fullName ? this.item.fullName : this.item.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.DARK_TEXT,
                  marginTop: 20,
                  textAlign: 'justify',
                }}>
                {this.item.additionalInfo}
              </Text>
              {this.item.hours ? <OpenHours hours={this.item.hours} /> : null}
              <View style={{width: '100%'}}>
                {this.item.www ? (
                  <URLComponent
                    content={this.item.www}
                    iconName={'web'}
                    iconComponent={MaterialCommunityIcons}
                  />
                ) : null}
                {this.item.facebook ? (
                  <URLComponent
                    content={App.translate('SeeObjectFacebook')}
                    iconName={'facebook-square'}
                    iconComponent={FontAwesome5}
                  />
                ) : null}
              </View>
            </View>
          </ScrollView>
          {this.item.telephone && this.item.telephone.length == 1 ? (
            <Fab
              iconName="phone"
              color={Colors.ACCENT}
              iconColor={Colors.PRIMARY}
              onPress={() => {
                Linking.openURL(`tel:${this.item.telephone[0]}`);
              }}
            />
          ) : this.item.telephone && this.item.telephone.length > 1 ? (
            <FabWithMultiIcons
              iconName="phone"
              color={Colors.ACCENT}
              iconColor={Colors.PRIMARY}
              actions={this.item.telephone.map(
                (phone: string, index: number) => {
                  return {
                    iconName: 'phone',
                    content: phone,
                    onPress: () =>
                      Linking.openURL(`tel:${this.item.telephone[index]}`),
                  };
                },
              )}
            />
          ) : null}
        </Card>
      </SafeAreaView>
    );
  }
}
