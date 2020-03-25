import React from 'react';
import {Text, View} from 'react-native';
import * as Colors from '../utility/Colors';
import App from '../../App';
import {Icon, Ripple} from 'material-bread';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Analytics from 'appcenter-analytics';
import * as Enums from '../model/Enums';

interface Props {}

export class ZeroFavorites extends React.Component<Props> {
  state = {
    iconName: 'heart-o',
    messageStay: false,
  };

  render() {
    return (
      <>
        <Text
          style={{
            margin: 20,
            color: Colors.TEXT_FAVORITES_PANEL,
            fontSize: 20,
          }}>
          {App.translate('zeroFavorite')}
        </Text>
        <View
          style={{
            width: '100%',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Ripple
            rippleContainerBorderRadius={30}
            style={{
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.handleIconFavoriteZeroClick()}>
            <Icon
              name={this.state.iconName} //favorite_border
              size={50}
              color="white"
              style={{fontWeight: 200}}
              iconComponent={FontAwesome}
            />
          </Ripple>
          {this.state.iconName == 'heart' || this.state.messageStay ? (
            <Text style={{color: Colors.TEXT_FAVORITES_PANEL, fontSize: 18}}>
              Właśnie tak!
            </Text>
          ) : null}
        </View>
      </>
    );
  }
  handleIconFavoriteZeroClick(): void {
    if (!this.state.messageStay)
      Analytics.trackEvent('On empty favorite list - Icon clicked!', {
        Category: Enums.AnaliticsCategories.FUN,
      });

    this.setState({
      iconName: this.state.iconName == 'heart-o' ? 'heart' : 'heart-o',
      messageStay: true,
    });
  }
}
