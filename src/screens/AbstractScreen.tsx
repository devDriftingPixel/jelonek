import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Appbar, ProgressBar, Ripple, Icon} from 'material-bread';
import Analytics from 'appcenter-analytics';
import * as Enums from '../model/Enums';
import * as Colors from '../utility/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {ListItem} from '../model/ListItem';
import {ExternalDataService} from '../services/ExternalDataService';
import {Message} from '../model/Message';
import {Phone} from '../model/Phone';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
    items: [] as ListItem[] | Message[] | Phone[],
    errorMessage: ``,
    activeItem: 0,
    progressBarVisible: true,
    infoVisible: false,
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
    ExternalDataService.getInstance().changeFavorite(item);
    this.getItems();
  }

  abstract getItems(): any;
  protected handleChangeInfoVisibility() {}

  componentDidMount() {
    Analytics.trackEvent(`Open page: ${this.pageName}`, {
      Category: Enums.AnalyticsCategories.NAVIGATION,
    });
  }

  render() {
    return (
      <>
        <SafeAreaView style={{flex: 1}}>
          <Appbar
            barType={'normal'}
            style={{borderRadius: 0}}
            color={Colors.PRIMARY}
            title={this.pageName}
            navigation={'arrow-back'}
            onNavigation={() => this.props.navigation?.goBack()}
            actionItems={
              this.state.infoVisible
                ? [
                    <Ripple
                      key={'0'}
                      rippleColor={Colors.ACCENT}
                      onPress={() => this.handleChangeInfoVisibility()}>
                      <Icon
                        key={'0'}
                        name={'close'}
                        size={29}
                        color={Colors.ACCENT}
                        iconComponent={FontAwesome}
                      />
                    </Ripple>,
                  ]
                : []
            }
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
      </>
    );
  }
}
