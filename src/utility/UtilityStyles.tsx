import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  flipX: {
    transform: [{scaleX: -1}],
  },
  flipY: {
    transform: [{scaleY: -1}],
  },
  itemList: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    height: 100,
    borderRadius: 15,
  },
  extendedItemList: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 15,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
