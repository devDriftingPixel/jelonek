import React, {Component} from 'react';
import {Text, View, ViewStyle, ScaledSize} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';

import {SafeAreaView} from 'react-native-safe-area-context';
import * as Colors from '../utility/Colors';
import {Avatar, IconButton, ListItem} from 'material-bread';
import Backdrop from '../components/Backdrop/Backdrop';

import App from '../../App';
import {ZeroFavorites} from '../components/ZeroFavorites';
import {Dimensions} from 'react-native';
import {MenuComponent} from '../components/MenuComponent';
import {ExternalDataService} from '../services/ExternalDataService';
import {FavoritesList} from '../components/FavoritesList';
import {NavigationEventSubscription} from 'react-navigation';
import RestService from '../services/RestService';
import NetworkService from '../services/NetworkService';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenMainMenu extends Component<Props> {
  private windowDimesions: ScaledSize;
  private navigationSubscription: NavigationEventSubscription;

  state = {
    favorites: [],
    unReadMessages: 0,
    progressBarVisible: false,
  };

  constructor(props: Props) {
    super(props);
    this.windowDimesions = Dimensions.get('window');
    this.navigationSubscription = {} as NavigationEventSubscription;
  }

  private willFocus() {
    this.setState({
      favorites: ExternalDataService.getInstance().getFavorites(),
    });
    this.updateMessageIndicator();
  }

  private onUnFavoriteItem(item: ListItem) {
    ExternalDataService.getInstance().changeFavorite(item);
    this.willFocus();
  }

  componentDidMount() {
    this.navigationSubscription = this.props.navigation!.addListener(
      'willFocus',
      this.willFocus.bind(this),
    );

    this.updateMessages();
  }

  componentWillUnmount() {
    this.navigationSubscription.remove();
  }

  render() {
    const styles = {
      container: {
        flex: 1,
        paddingTop: 30,
        color: Colors.PRIMARY,
      },
      backdropHeader: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY, //App bar i main menu color
      },
      backdropHeaderTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: '500',
        marginLeft: 72,
      },
    };

    const backLayerRevealed = (
      <View style={{width: '100%', backgroundColor: Colors.PRIMARY}}>
        <View style={styles.backdropHeader as ViewStyle}>
          <Text style={styles.backdropHeaderTitle as ViewStyle}>
            {App.translate('favorite')}
          </Text>
        </View>
        {this.state.favorites.length == 0 ? (
          <ZeroFavorites />
        ) : (
          <FavoritesList
            data={this.state.favorites}
            onUnFavoriteItem={this.onUnFavoriteItem.bind(this)}
            navigation={this.props.navigation}
          />
        )}
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
          style={{
            flex: 1,
            backgroundColor: Colors.DARK_TEXT,
          }}>
          <Backdrop
            unReadMessages={this.state.unReadMessages}
            navigation={this.props.navigation}
            subheader={''}
            backLayerConcealed={
              <View style={styles.backdropHeader as ViewStyle}>
                <Text style={styles.backdropHeaderTitle as ViewStyle}>App</Text>
              </View>
            }
            backLayerStyle={{backgroundColor: Colors.PRIMARY}} // Favorite background
            backLayerRevealed={backLayerRevealed}
            offset={this.getOffsetForFavoriteItemNumber(
              this.state.favorites.length,
            )}>
            <MenuComponent
              progressBarVisible={this.state.progressBarVisible}
              dimension={this.windowDimesions}
              navigation={this.props.navigation}
            />
          </Backdrop>
        </View>
      </SafeAreaView>
    );
  }

  private getOffsetForFavoriteItemNumber(numberOfFavorites: number): number {
    switch (numberOfFavorites) {
      case 0:
        return this.windowDimesions.height / 2;
      case 1:
        return 180;
      case 2:
        return 300;
      case 3:
        return 430;
      default:
        return 500;
    }
  }

  private updateMessages() {
    if (!NetworkService.getInstance().isConnected()) {
      this.setState({progressBarVisible: false});
      return;
    }

    RestService.getInstance()
      .updateMessages()
      .then((response: Response) => {
        return response.text();
      })
      .then((textUpdateData: string) => {
        const lastUpdateDbDate = new Date(textUpdateData);
        const lastUpdateLocalDate = ExternalDataService.getInstance()
          .getMessagesLastUpdate()
          .getTime();

        const difference = lastUpdateDbDate.getTime() - lastUpdateLocalDate;
        if (difference > 0) {
          return RestService.getInstance().getMessages();
        } else {
          ExternalDataService.getInstance().updateMessagesLastUpdate();
          this.setState({progressBarVisible: false});
          return {then: () => {}};
        }
      })
      .then((response: Response) => {
        //Response of all shops request
        return response.text();
      })
      .then((jsonShopsData: string) => {
        const newshopData = JSON.parse(jsonShopsData);
        ExternalDataService.getInstance().updateMessages(newshopData);
        this.updateMessageIndicator();
      })
      .catch((error: any) => {
        console.error(error);
        this.setState({progressBarVisible: false});
      });
  }

  private updateMessageIndicator() {
    this.setState({
      progressBarVisible: false,
      unReadMessages: ExternalDataService.getInstance().getUnreadMessagesCount(),
    });
  }
}
