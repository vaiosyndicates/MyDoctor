import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};

export const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('@storage_Key');
  } catch (e) {
    // remove error
    console.log(e);
  }

  console.log('Done.');
};
