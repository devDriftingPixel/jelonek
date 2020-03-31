import {DataStorage} from '../model/DataStorage';
import {ListItem} from '../model/ListItem';
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

  public getMessages(): Message[] {
    return this.dataStorage.messages.items;
  }

  public getUnreadMessagesCount(): number {
    return this.dataStorage.messages.items.filter(message => !message.read)
      .length;
  }

  markAllMessagesAsRead() {
    this.dataStorage.messages.items.forEach(message => (message.read = true));
    this.saveStorage();
  }

  public updateMessages(jsonItemsData: Message[]) {
    let counter = 0;
    this.getMessages().forEach(item => {
      const newItemWithId = jsonItemsData.find(
        newItem => newItem.id == item.id,
      );
      if (newItemWithId) {
        newItemWithId.read = item.read;
        counter++;
      }
    });
    this.dataStorage.messages.items = jsonItemsData;
    this.dataStorage.messages.lastUpdate = new Date().toISOString();
    this.saveStorage();
  }

  public getMessagesLastUpdate(): Date {
    return new Date(this.dataStorage.messages.lastUpdate);
  }

  public updateMessagesLastUpdate(): void {
    this.dataStorage.messages.lastUpdate = new Date().toISOString();
    this.saveStorage();
  }

  public getPhones(): Phone[] {
    return this.dataStorage.phones.items;
  }

  public updatePhones(jsonShopsData: Phone[]) {
    this.dataStorage.phones.items = jsonShopsData;
    this.dataStorage.phones.lastUpdate = new Date().toISOString();
    this.saveStorage();
  }

  public getPhonesLastUpdate(): Date {
    return new Date(this.dataStorage.phones.lastUpdate);
  }

  public updatePhonesLastUpdate(): void {
    this.dataStorage.phones.lastUpdate = new Date().toISOString();
    this.saveStorage();
  }

  public getOffices(): ListItem[] {
    return this.dataStorage.offices.items;
  }

  public updateOffices(jsonShopsData: ListItem[]) {
    this.dataStorage.offices.items = jsonShopsData;
    this.dataStorage.offices.lastUpdate = new Date().toISOString();
    this.saveStorage();
  }

  public getOfficesLastUpdate(): Date {
    return new Date(this.dataStorage.offices.lastUpdate);
  }

  public updateOfficesLastUpdate(): void {
    this.dataStorage.offices.lastUpdate = new Date().toISOString();
    this.saveStorage();
  }

  public getShops(): ListItem[] {
    return this.dataStorage.shops.items;
  }

  public updateShops(jsonShopsData: ListItem[]) {
    let counter = 0;
    this.getShops().forEach(item => {
      const newItemWithId = jsonShopsData.find(
        newItem => newItem.id == item.id,
      );
      if (newItemWithId) {
        newItemWithId.isFavorite = item.isFavorite;
        counter++;
      }
    });
    this.dataStorage.shops.items = jsonShopsData;
    this.dataStorage.shops.lastUpdate = new Date().toISOString();
    this.saveStorage();
  }

  public getShopsLastUpdate(): Date {
    return new Date(this.dataStorage.shops.lastUpdate);
  }

  public updateShopsLastUpdate(): void {
    this.dataStorage.shops.lastUpdate = new Date().toISOString();
    this.saveStorage();
  }

  public getRestaurants(): ListItem[] {
    return this.dataStorage.restaurants.items;
  }

  public updateRestaurants(jsonItemsData: ListItem[]) {
    let counter = 0;
    this.getRestaurants().forEach(item => {
      const newItemWithId = jsonItemsData.find(
        newItem => newItem.id == item.id,
      );
      if (newItemWithId) {
        newItemWithId.isFavorite = item.isFavorite;
        counter++;
      }
    });

    this.dataStorage.restaurants.items = jsonItemsData;
    this.dataStorage.restaurants.lastUpdate = new Date().toISOString();
    this.saveStorage();
  }

  public getRestaurantsLastUpdate(): Date {
    return new Date(this.dataStorage.restaurants.lastUpdate);
  }

  public updateRestaurantsLastUpdate(): void {
    this.dataStorage.restaurants.lastUpdate = new Date().toISOString();
    this.saveStorage();
  }

  public getChemists(): ListItem[] {
    return this.dataStorage.chemists.items;
  }

  public updateChemist(jsonItemsData: ListItem[]) {
    let counter = 0;
    this.getChemists().forEach(item => {
      const newItemWithId = jsonItemsData.find(
        newItem => newItem.id == item.id,
      );
      if (newItemWithId) {
        newItemWithId.isFavorite = item.isFavorite;
        counter++;
      }
    });

    this.dataStorage.chemists.items = jsonItemsData;
    this.dataStorage.chemists.lastUpdate = new Date().toISOString();
    this.saveStorage();
  }

  public getChemistLastUpdate(): Date {
    return new Date(this.dataStorage.chemists.lastUpdate);
  }

  public updateChemistLastUpdate(): void {
    this.dataStorage.chemists.lastUpdate = new Date().toISOString();
    this.saveStorage();
  }

  public getHospitals(): ListItem[] {
    return this.dataStorage.hospitals.items;
  }

  public updateHospitals(jsonItemsData: ListItem[]) {
    let counter = 0;
    this.getHospitals().forEach(item => {
      const newItemWithId = jsonItemsData.find(
        newItem => newItem.id == item.id,
      );
      if (newItemWithId) {
        newItemWithId.isFavorite = item.isFavorite;
        counter++;
      }
    });

    this.dataStorage.hospitals.items = jsonItemsData;
    this.dataStorage.hospitals.lastUpdate = new Date().toISOString();
    this.saveStorage();
  }

  public getHospitalsLastUpdate(): Date {
    return new Date(this.dataStorage.hospitals.lastUpdate);
  }

  public updateHospitalsLastUpdate(): void {
    this.dataStorage.hospitals.lastUpdate = new Date().toISOString();
    this.saveStorage();
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
      ...this.dataStorage.hospitals.items,
    ];
  }
}
