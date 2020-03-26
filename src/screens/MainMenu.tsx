import React, {Component} from 'react';
import {Text, View, ViewStyle, ScaledSize} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';

import {SafeAreaView} from 'react-native-safe-area-context';
import * as Colors from '../utility/Colors';
import {Avatar, IconButton} from 'material-bread';
import Backdrop from '../components/Backdrop/Backdrop';

import App from '../../App';
import {ZeroFavorites} from '../components/ZeroFavorites';
import {Dimensions} from 'react-native';
import {MenuComponent} from '../components/MenuComponent';
import {ExternalDataService} from '../services/ExternalDataService';
import {FavoritesList} from '../components/FavoritesList';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenMainMenu extends Component<Props> {
  private windowDimesions: ScaledSize;

  state = {
    favorites: [],
  };

  constructor(props: Props) {
    super(props);
    this.windowDimesions = Dimensions.get('window');
  }

  private willFocus() {
    this.setState({favorites: ExternalDataService.getFavorites()});
  }

  componentDidMount() {
    this.props.navigation!.addListener('willFocus', this.willFocus.bind(this));
  }

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

        {this.state.favorites.length == 0 ? (
          <ZeroFavorites />
        ) : (
          <FavoritesList data={this.state.favorites} />
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
          style={{marginBottom: 80, flex: 1, backgroundColor: Colors.PRIMARY}}>
          <Backdrop
            subheader={''}
            backLayerConcealed={
              <View style={styles.backdropHeader as ViewStyle}>
                <Text style={styles.backdropHeaderTitle as ViewStyle}>App</Text>
              </View>
            }
            backLayerStyle={{backgroundColor: Colors.PRIMARY}}
            backLayerRevealed={backLayerRevealed}
            offset={this.getOffsetForFavoriteItemNumber(
              this.state.favorites.length,
            )}>
            <MenuComponent
              dimension={this.windowDimesions}
              navigation={this.props.navigation}
            />
          </Backdrop>
        </View>
      </SafeAreaView>
    );
  }
  getOffsetForFavoriteItemNumber(numberOfFavorites: number): number {
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
}
