import {DataStorage} from '../model/DataStorage';
import {ListItem} from '../model/ListItem';
import {DataItemTypes} from '../model/Enums';
import {Message} from '../model/Message';

const dataStorage: DataStorage = require('../assets/data.json');

export class ExternalDataService {
  constructor() {}

  public static getMessages(): Promise<Message[]> {
    return new Promise((resolve: Function, reject: Function) => {
      try {
        const result = dataStorage.messages;
        setTimeout(() => {
          resolve(result);
        }, 2000);
      } catch (exception) {
        reject(exception);
      }
    });
  }

  public static getShops(): Promise<ListItem[]> {
    return ExternalDataService.getItems(DataItemTypes.SHOPS);
  }

  public static getRestaurants(): Promise<ListItem[]> {
    return ExternalDataService.getItems(DataItemTypes.RESTAURANTS);
  }

  public static getFavorites(): ListItem[] {
    return dataStorage.objects.filter((object: ListItem) => object.isFavorite);
  }

  private static getItems(dataItemType: DataItemTypes): Promise<ListItem[]> {
    return new Promise((resolve: Function, reject: Function) => {
      try {
        const result = dataStorage.objects.filter(
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

  static changeFavorite(item: any) {
    console.log('Change favorite for item:', item);
    dataStorage.objects[
      dataStorage.objects.indexOf(item)
    ].isFavorite = !dataStorage.objects[dataStorage.objects.indexOf(item)]
      .isFavorite;
  }
}
