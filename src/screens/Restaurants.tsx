import {NavigationStackProp} from 'react-navigation-stack';
import {ScreenShops} from './Shops';
import {ExternalDataService} from '../services/ExternalDataService';
import {ListItem} from 'material-bread';
import App from '../../App';
type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenRestaurants extends ScreenShops {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    ExternalDataService.getRestaurants()
      .then(restaurants =>
        this.setState({
          items: restaurants,
          errorMessage:
            restaurants.length == 0 ? App.translate('zeroItems') : '',
        }),
      )
      .catch((error: any) => console.error(error));
  }

  render() {
    return super.render();
  }
}
