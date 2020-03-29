import React, {Component} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ListItem} from '../model/ListItem';
import {Appbar, Card, Icon} from 'material-bread';
import * as Colors from '../utility/Colors';
import {Fab} from '../components/Fab';
import {Linking} from 'react-native';
import {FabWithMultiIcons} from '../components/FabWithMultiIcons';
import {OpenHours} from '../components/OpenHours';
import {URLComponent} from '../components/URLComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import App from '../../App';
import {Utility} from '../utility/Utility';
import {AddressComponent} from '../components/AddressComponent';
import HTML from 'react-native-render-html';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenObjectDetails extends Component<Props> {
  private item: ListItem;
  private iconName: string;

  constructor(props: Props) {
    super(props);
    const {params} = this.props.navigation!.state;
    this.item = params!.item;
    this.iconName = params!.iconName;
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
          title={
            this.item.name.length < 25
              ? this.item.name
              : `${this.item.name.substr(0, 20)}...`
          }
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
              <Icon
                name={this.iconName}
                size={45}
                color={Colors.PRIMARY}
                style={{width: 50, height: 50, margin: 15}}
                iconComponent={FontAwesome5}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: Colors.PRIMARY,
                  fontWeight: 'bold',
                }}>
                {this.item.fullName ? this.item.fullName : this.item.name}
              </Text>
              {this.item.additionalInfo ? (
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.DARK_TEXT,
                    marginTop: 20,
                    textAlign: 'justify',
                  }}>
                  {this.item.additionalInfo}
                </Text>
              ) : null}
              {this.item.htmlContent ? (
                <HTML
                  html={this.item.htmlContent}
                  imagesMaxWidth={Dimensions.get('window').width}
                />
              ) : null}
              {this.item.hours ? <OpenHours hours={this.item.hours} /> : null}
              <View style={{width: '100%'}}>
                {this.item.www ? (
                  <URLComponent
                    content={this.item.www}
                    iconName={'web'}
                    iconComponent={MaterialCommunityIcons}
                    onPress={() => Utility.openLink(this.item.www)}
                  />
                ) : null}
                {this.item.facebook ? (
                  <URLComponent
                    content={App.translate('SeeObjectFacebook')}
                    iconName={'facebook-square'}
                    iconComponent={FontAwesome5}
                    onPress={() => Utility.openLink(this.item.facebook)}
                  />
                ) : null}
              </View>
            </View>
            <AddressComponent item={this.item} />
            <View style={{height: 20}}></View>
          </ScrollView>
          {this.item.phones && this.item.phones.length == 1 ? (
            <Fab
              iconName="phone"
              color={Colors.ACCENT}
              iconColor={Colors.PRIMARY}
              onPress={() => {
                Linking.openURL(`tel:${this.item.phones[0]}`);
              }}
            />
          ) : this.item.phones && this.item.phones.length > 1 ? (
            <FabWithMultiIcons
              iconName="phone"
              color={Colors.ACCENT}
              iconColor={Colors.PRIMARY}
              actions={this.item.phones.map((phone: string, index: number) => {
                return {
                  iconName: 'phone',
                  content: phone,
                  onPress: () =>
                    Linking.openURL(`tel:${this.item.phones[index]}`),
                };
              })}
            />
          ) : null}
        </Card>
      </SafeAreaView>
    );
  }
}
