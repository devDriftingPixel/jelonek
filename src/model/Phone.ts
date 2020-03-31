import {Favoritable} from './Favoritable';

export interface Phone extends Favoritable {
  id: string;
  name: string;
  phones: string[];
}
