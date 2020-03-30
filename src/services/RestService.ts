import {ExternalDataService} from './ExternalDataService';

export default class RestService {
  private static instance: RestService;

  private readonly restURL =
    'https://us-central1-jelonek-stage.cloudfunctions.net/data';

  private readonly shopsPostfix = 'shops';
  private readonly shopsUpdatePostfix = 'shopsUpdate';

  private readonly messagesPostfix = 'messages';
  private readonly messagesUpdatePostfix = 'messagesUpdate';

  private readonly restaurantsPostfix = 'restaurants';
  private readonly restaurantsUpdatePostfix = 'restaurantsUpdate';

  private readonly chemistsPostfix = 'chemists';
  private readonly chemistsUpdatePostfix = 'chemistsUpdate';

  private readonly phonesPostfix = 'phones';
  private readonly phonesUpdatePostfix = 'phonesUpdate';

  private readonly officesPostfix = 'offices';
  private readonly officesUpdatePostfix = 'officesUpdate';

  private readonly hospitalsPostfix = 'hospitals';
  private readonly hospitalsUpdatePostfix = 'hospitalsUpdate';

  private Constructor() {}

  public static getInstance(): RestService {
    if (!RestService.instance) RestService.instance = new RestService();
    return RestService.instance;
  }

  public updateShops(): any {
    return fetch(`${this.restURL}/${this.shopsUpdatePostfix}`);
  }
  public getShops(): any {
    return fetch(`${this.restURL}/${this.shopsPostfix}`);
  }

  public updateMessages(): any {
    return fetch(`${this.restURL}/${this.messagesUpdatePostfix}`);
  }
  public getMessages(): any {
    return fetch(`${this.restURL}/${this.messagesPostfix}`);
  }

  public updateChemists(): any {
    return fetch(`${this.restURL}/${this.chemistsUpdatePostfix}`);
  }
  public getChemists(): any {
    return fetch(`${this.restURL}/${this.chemistsPostfix}`);
  }

  public updatePhones(): any {
    return fetch(`${this.restURL}/${this.phonesUpdatePostfix}`);
  }
  public getPhones(): any {
    return fetch(`${this.restURL}/${this.phonesPostfix}`);
  }

  public updateRestaurants(): any {
    return fetch(`${this.restURL}/${this.restaurantsUpdatePostfix}`);
  }
  public getRestaurants(): any {
    return fetch(`${this.restURL}/${this.restaurantsPostfix}`);
  }

  public updateOffices(): any {
    return fetch(`${this.restURL}/${this.officesUpdatePostfix}`);
  }
  public getOffices(): any {
    return fetch(`${this.restURL}/${this.officesPostfix}`);
  }

  public updateHospitals(): any {
    return fetch(`${this.restURL}/${this.hospitalsUpdatePostfix}`);
  }
  public getHospitals(): any {
    return fetch(`${this.restURL}/${this.hospitalsPostfix}`);
  }
}
