import NetInfo, {NetInfoSubscription} from '@react-native-community/netinfo';
import Analytics from 'appcenter-analytics';
import {AnalyticsCategories} from '../model/Enums';

export default class NetworkService {
  private static instance: NetworkService;

  public unsuscribe: NetInfoSubscription;

  private state: any;

  private constructor() {
    this.unsuscribe = NetInfo.addEventListener(state => {
      this.state = state;
    });

    NetInfo.fetch()
      .then(state => {
        Analytics.trackEvent(
          `Net Connection status on App start-> type: ${state.type}, isConnected: ${state.isConnected}`,
          {
            Category: AnalyticsCategories.ANALYTICS,
          },
        );
        console.log('Connection state!!', state);
        this.state = state;
      })
      .catch(error => {
        console.warn('Error test connection!!!!');
      });
  }

  public static getInstance() {
    if (!NetworkService.instance)
      NetworkService.instance = new NetworkService();

    return NetworkService.instance;
  }

  public isConnected() {
    return this.state.isConnected;
  }
}
