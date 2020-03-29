import {DataStorage} from '../model/DataStorage';
import {ListItem} from '../model/ListItem';
import {DataItemTypes} from '../model/Enums';
import {Message} from '../model/Message';
import {Phone} from '../model/Phone';
import AsyncStorage from '@react-native-community/async-storage';
import * as Enums from '../model/Enums';
import Analytics from 'appcenter-analytics';

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
    AsyncStorage.getItem('dataStorageStoreKey')
      .then(dataStorageString => {
        if (dataStorageString !== null) {
          this.dataStorage = JSON.parse(dataStorageString) as DataStorage;
        } else {
          this.dataStorage = jsonStorage;
          this.saveStorage();
        }
      })
      .catch(error =>
        Analytics.trackEvent(
          `Get storage from AsyncStorage error: ${JSON.stringify(error)}`,
          {
            Category: Enums.AnalyticsCategories.FAIL,
          },
        ),
      );
  }

  public getAdditionalHospitalInfoVisible(): boolean {
    if (!this.dataStorage.appState) return true;
    return this.dataStorage.appState.additionalHospitalInfoVisible;
  }

  public setAdditionalHospitalInfoVisible(newValue: boolean) {
    this.dataStorage.appState.additionalHospitalInfoVisible = newValue;
    this.saveStorage();
  }

  public getMessages(): Promise<Message[]> {
    return new Promise((resolve: Function, reject: Function) => {
      try {
        const result = this.dataStorage.messages;
        setTimeout(() => {
          resolve(result);
        }, 2000);
      } catch (exception) {
        reject(exception);
      }
    });
  }

  public getPhones(): Promise<Phone[]> {
    return new Promise((resolve: Function, reject: Function) => {
      try {
        const result = this.dataStorage.phones;
        setTimeout(() => {
          resolve(result);
        }, 0);
      } catch (exception) {
        reject(exception);
      }
    });
  }

  public getOffices(): Promise<ListItem[]> {
    return this.getItems(DataItemTypes.OFFICE);
  }

  public getShops(): Promise<ListItem[]> {
    return this.getItems(DataItemTypes.SHOPS);
  }

  public getRestaurants(): Promise<ListItem[]> {
    return this.getItems(DataItemTypes.RESTAURANTS);
  }

  public getChemists(): Promise<ListItem[]> {
    return this.getItems(DataItemTypes.CHEMIST);
  }

  public getHospitals(): Promise<ListItem[]> {
    return this.getItems(DataItemTypes.MEDIC);
  }

  public getFavorites(): ListItem[] {
    if (this.dataStorage.objects)
      return this.dataStorage.objects.filter(
        (object: ListItem) => object.isFavorite,
      );
    else return [];
  }

  private getItems(dataItemType: DataItemTypes): Promise<ListItem[]> {
    return new Promise((resolve: Function, reject: Function) => {
      try {
        const result = this.dataStorage.objects.filter(
          (object: ListItem) => object.type == dataItemType,
        );
        setTimeout(() => {
          resolve(result);
        }, 0);
      } catch (exception) {
        reject(exception);
      }
    });
  }

  public changeFavorite(item: any) {
    this.dataStorage.objects[
      this.dataStorage.objects.indexOf(item)
    ].isFavorite = !this.dataStorage.objects[
      this.dataStorage.objects.indexOf(item)
    ].isFavorite;
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
}
