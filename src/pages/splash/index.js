import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILLogo} from '../../assets';
import {colors, fonts, storeData} from '../../utils';
import {Firebase} from '../../config';
import {useDispatch} from 'react-redux';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      setTimeout(() => {
        if (user) {
          Firebase.database()
            .ref(`users/${user.uid}`)
            .once('value')
            .then(response => {
              storeData('user', response.val());
              dispatch({type: 'SAVE_USER', value: response.val()});
              navigation.replace('MainApp');
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          navigation.replace('GetStarted');
        }
      }, 3000);
    });
    return () => unsubscribe();
  }, [dispatch, navigation]);

  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>goDoc App</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    marginTop: 20,
  },
});
