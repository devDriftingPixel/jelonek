import React, {Component} from 'react';
import {Text, SafeAreaView, Image} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import * as Images from '../utility/Images';
import {
  Appbar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Icon,
  Ripple,
} from 'material-bread';
import * as Colors from '../utility/Colors';
import App from '../../App';
import {FlatList} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenInformations extends Component<Props> {
  private elements: {
    title: string;
    source: any;
    infoSource: string;
    description: string;
  }[];

  state = {
    isImageViewVisible: false,
    currentImageSource: '',
  };

  constructor(props: Props) {
    super(props);

    this.elements = [
      {
        title: 'Zasady Kwarantanny',
        infoSource: 'Ministerstwo Zdrowia',
        source: Images.IMPORTANT_IMAGE_RULES,
        description: 'Zasady kwarantanny w związku z koronawirusem.',
      },
      {
        title: 'Mycie rąk',
        infoSource: 'Ministerstwo Zdrowia',
        source: Images.IMPORTANT_IMAGE_HANDS2,
        description: 'Prosta instrukcja, jak skutecznie myć ręce.',
      },
      {
        title: 'Dezynfekcja Rąk',
        infoSource: 'Ministerstwo Zdrowia',
        source: Images.IMPORTANT_IMAGE_HANDS1,
        description: 'Sprawdź, jak skutecznie dezynfekować ręce.',
      },
      {
        title: 'Koronawirus',
        infoSource: 'Ministerstwo Zdrowia',
        source: Images.IMPORTANT_IMAGE_KORONAVIRUS,
        description: 'Jak zapobiegać zakazeniu koronawirusem.',
      },
    ];
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar
          barType={'normal'}
          color={Colors.PRIMARY}
          title={App.translate('menu_informations')}
          navigation={'arrow-back'}
          onNavigation={() =>
            this.state.isImageViewVisible
              ? this.closeImage()
              : this.props.navigation?.goBack()
          }
          actionItems={
            this.state.isImageViewVisible
              ? [
                  <Ripple
                    rippleColor={Colors.ACCENT}
                    onPress={() => this.closeImage()}>
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
        {this.state.isImageViewVisible ? (
          <Image
            resizeMode={'contain'}
            source={this.state.currentImageSource}
            style={{width: '100%', height: '100%'}}
          />
        ) : (
          <FlatList
            data={this.elements}
            keyExtractor={item => this.elements.indexOf(item).toString()}
            renderItem={({item}) => (
              <Card style={{maxWidth: 400, flex: 1, margin: 10}}>
                <Ripple
                  rippleColor={Colors.PRIMARY}
                  rippleContainerBorderRadius={5}
                  onPress={() => this.showImage(item)}>
                  <CardHeader title={item.title} subtitle={item.infoSource} />
                  <CardMedia
                    image={
                      <Image
                        style={{flex: 1, width: '100%'}}
                        source={item.source}
                        resizeMode="cover"
                      />
                    }
                  />
                  <CardContent>
                    <Text style={{color: 'rgba(0,0,0,.6)', fontSize: 14}}>
                      {item.description}
                    </Text>
                  </CardContent>
                </Ripple>
              </Card>
            )}
          />
        )}
      </SafeAreaView>
    );
  }

  private closeImage(): void {
    this.setState({isImageViewVisible: false});
  }

  private showImage(item: {
    title: string;
    source: any;
    infoSource: string;
    description: string;
  }): void {
    this.setState({isImageViewVisible: true, currentImageSource: item.source});
  }
}
