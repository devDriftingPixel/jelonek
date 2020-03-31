import {
  Districts,
  DataItemTypes,
  DataItemSubtypes,
  Amenities,
} from '../model/Enums';
import {Hours} from './Hours';
import {Favoritable} from './Favoritable';

export interface ListItem extends Favoritable {
  id: string;
  name: string;
  fullName: string;
  district: Districts;
  type: DataItemTypes;
  subType?: DataItemSubtypes;
  amenities: Amenities[];
  email: [string];
  phones: string[];
  additionalInfo: string;
  hours: Hours[];
  www: string;
  facebook: string;
  address: string;
  htmlContent: string;
}
