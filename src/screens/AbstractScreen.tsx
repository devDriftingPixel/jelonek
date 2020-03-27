import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Appbar, ProgressBar} from 'material-bread';
import Analytics from 'appcenter-analytics';
import * as Enums from '../model/Enums';
import * as Colors from '../utility/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {ListItem} from '../model/ListItem';
import {ExternalDataService} from '../services/ExternalDataService';
import {Message} from '../model/Message';

type Props = {
  navigation?: NavigationStackProp;
};

export abstract class AbstractScreen extends Component<Props> {
  protected pageName: string;
  protected iconName: string;

  constructor(props: Props) {
    super(props);

    const {params} = this.props.navigation!.state;
    this.pageName = params!.name;
    this.iconName = params!.iconName;
  }

  state = {
    items: [] as ListItem[] | Message[],
    errorMessage: ``,
    activeItem: 0,
    progressBarVisible: true,
  };

  protected pageContent() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text> Abstract!!! </Text>
      </View>
    );
  }
  protected footerContent() {
    return <></>;
  }

  protected getState() {
    return this.state;
  }

  protected onFavoriteSelected(item: any) {
    ExternalDataService.changeFavorite(item);
    this.getItems();
  }

  abstract getItems(): any;

  componentDidMount() {
    Analytics.trackEvent(`Open page: ${this.pageName}`, {
      Category: Enums.AnaliticsCategories.NAVIGATION,
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar
          barType={'normal'}
          color={Colors.PRIMARY}
          title={this.pageName}
          navigation={'arrow-back'}
          onNavigation={() => this.props.navigation?.goBack()}
        />
        {this.state.errorMessage.length > 0 ? (
          <ScrollView style={{minHeight: 60}}>
            <Text
              style={{
                flex: 1,
                margin: 20,
                fontSize: 16,
              }}>
              {this.state.errorMessage}
            </Text>
          </ScrollView>
        ) : null}
        {this.state.progressBarVisible ? (
          <ProgressBar
            visible
            indicatorStartPosition={0}
            color={Colors.ACCENT}
            height={15}
            style={{margin: 20}}
          />
        ) : null}
        <this.pageContent />
        <this.footerContent />
      </SafeAreaView>
    );
  }
}
