import {DataStorage} from '../model/DataStorage';
import {ListItem} from '../model/ListItem';
import {Message} from '../model/Message';
import {Phone} from '../model/Phone';
import AsyncStorage from '@react-native-community/async-storage';
import * as Enums from '../model/Enums';
import Analytics from 'appcenter-analytics';
import {v5 as uuidv5} from 'uuid';

const jsonStorage: DataStorage = require('../assets/data.json');

export class ExternalDataService {
  private static instance: ExternalDataService;
  private static readonly DATA_STORAGE_KEY = 'dataStorageStoreKey';

  private dataStorage: DataStorage;

  public static getInstance(): ExternalDataService {
    if (!ExternalDataService.instance)
      ExternalDataService.instance = new ExternalDataService();

    return ExternalDataService.instance;
  }

  private constructor() {
    this.dataStorage = {} as DataStorage;
    this.prepareDataStorage();
  }

  private async prepareDataStorage() {
    // AsyncStorage.getItem('dataStorageStoreKey')
    //   .then(dataStorageString => {
    //     if (dataStorageString !== null) {
    //       this.dataStorage = JSON.parse(dataStorageString) as DataStorage;
    //     } else {
    this.dataStorage = jsonStorage;
    //     this.saveStorage();
    //   }
    // })
    // .catch(error =>
    //   Analytics.trackEvent(
    //     `Get storage from AsyncStorage error: ${JSON.stringify(error)}`,
    //     {
    //       Category: Enums.AnalyticsCategories.FAIL,
    //     },
    //   ),
    // );
  }

  public getAdditionalHospitalInfoVisible(): boolean {
    if (!this.dataStorage.appState) return true;
    return this.dataStorage.appState.additionalHospitalInfoVisible;
  }

  public setAdditionalHospitalInfoVisible(newValue: boolean) {
    this.dataStorage.appState.additionalHospitalInfoVisible = newValue;
    this.saveStorage();
  }

  public getMessages(): Message[] {
    return this.dataStorage.messages.items;
  }

  public getPhones(): Phone[] {
    return this.dataStorage.phones.items;
  }

  public getOffices(): ListItem[] {
    return this.dataStorage.offices.items;
  }

  public getShops(): ListItem[] {
    return this.dataStorage.shops.items;
  }

  public getRestaurants(): ListItem[] {
    console.log('@!@@ ->', this.dataStorage.restaurants);
    return this.dataStorage.restaurants.items;
  }

  public getChemists(): ListItem[] {
    return this.dataStorage.chemists.items;
  }

  public getHospitals(): ListItem[] {
    return this.dataStorage.hospitals.items;
  }

  public getFavorites(): ListItem[] {
    if (!this.dataStorage.shops) return []; //if shops are loaded other list are loaded too ;)
    return this.getObjects().filter((object: ListItem) => object.isFavorite);
  }

  public changeFavorite(item: any) {
    const objects = this.getObjects();
    objects[objects.indexOf(item)].isFavorite = !objects[objects.indexOf(item)]
      .isFavorite;
    this.saveStorage();
  }

  private async saveStorage() {
    try {
      await AsyncStorage.setItem(
        ExternalDataService.DATA_STORAGE_KEY,
        JSON.stringify(this.dataStorage),
      );
    } catch (error) {
      Analytics.trackEvent(`Save storage error: ${JSON.stringify(error)}`, {
        Category: Enums.AnalyticsCategories.FAIL,
      });
    }
  }

  private getObjects() {
    return [
      ...this.dataStorage.shops.items,
      ...this.dataStorage.restaurants.items,
      ...this.dataStorage.chemists.items,
    ];
  }
}
