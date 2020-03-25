import React, {Component} from 'react';
import {Text} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';

import {SafeAreaView} from 'react-native-safe-area-context';
import App from '../../App';
import {Badge, Appbar, IconButton} from 'material-bread';
import Analytics from 'appcenter-analytics';
import * as AnaliticsConstants from '../utility/AnalyticsConstants';
import * as Colors from '../utility/Colors.ts';

type Props = {
  navigation?: NavigationStackProp;
};

export class AbstractScreen extends Component<Props> {
  protected pageName: string;
  protected iconName: string;

  constructor(props: Props) {
    super(props);

    const {params} = this.props.navigation!.state;
    this.pageName = params!.name;
    this.iconName = params!.iconName;
  }

  componentDidMount() {
    Analytics.trackEvent(`Open page: ${this.pageName}`, {
      Category: AnaliticsConstants.categories.NAVIGATION,
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
          actionItems={[
            {name: 'favorite', onPress: () => console.log('onSearch')},
          ]}
        />
        <Text>{this.pageName}</Text>
        <Text>{this.iconName}</Text>
      </SafeAreaView>
    );
  }
}
