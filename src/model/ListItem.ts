import {
  Districts,
  DataItemTypes,
  DataItemSubtypes,
  Amenities,
} from '../model/Enums';
import {Hours} from './Hours';

export interface ListItem {
  name: string;
  fullName: string;
  district: Districts;
  type: DataItemTypes;
  subType?: DataItemSubtypes;
  isFavorite: boolean;
  amenities: Amenities[];
  email: [string];
  phones: string[];
  additionalInfo: string;
  hours: Hours[];
  www: string;
  facebook: string;
  address: string;
}
