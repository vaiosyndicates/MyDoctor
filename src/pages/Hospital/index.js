import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {ILHospitalBG, Hospital1, Hospital2, Hospital3} from '../../assets';
import {fonts, colors, showError, parseArray} from '../../utils';
import {ListHospital} from '../../component';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {Firebase} from '../../config';

const Hospital = () => {
  const dispatch = useDispatch();
  const stateGlobal = useSelector(state => state.hospitals);

  useFocusEffect(
    React.useCallback(() => {
      Firebase.database()
        .ref('hospitals/')
        .once('value')
        .then(res => {
          if (res.val()) {
            const data = parseArray(res.val());
            dispatch({type: 'GET_HOSPITALS', value: data});
          }
        })
        .catch(err => {
          showError(err.message);
        });
    }, [dispatch]),
  );

  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.pageTitle}>Nearby Hospital</Text>
        <Text style={styles.room}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        {stateGlobal.map((current, i) => {
          return (
            <ListHospital
              key={i}
              type={current.data.type}
              name={current.data.title}
              address={current.data.address}
              pic={current.data.thumbnail}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Hospital;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  room: {
    fontSize: 15,
    fontFamily: fonts.primary.normal,
    color: colors.white,
    textAlign: 'center',
  },
});
