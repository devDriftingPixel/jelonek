import {ListItem} from './ListItem';
import {Message} from './Message';
import {Phone} from './Phone';
import {AppState} from './AppState';
import {DataItem} from './DataItem';

export interface DataStorage {
  offices: DataItem<ListItem>;
  chemists: DataItem<ListItem>;
  shops: DataItem<ListItem>;
  restaurants: DataItem<ListItem>;
  hospitals: DataItem<ListItem>;
  messages: DataItem<Message>;
  phones: DataItem<Phone>;
  appState: AppState;
}
