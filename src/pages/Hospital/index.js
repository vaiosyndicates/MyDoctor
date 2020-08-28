import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {ILHospitalBG, Hospital1, Hospital2, Hospital3} from '../../assets';
import {fonts, colors} from '../../utils';
import {ListHospital} from '../../component';

const Hospital = () => {
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.pageTitle}>Nearby Hospital</Text>
        <Text style={styles.room}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListHospital
          type="Rumah Sakit Umum"
          name="Cakra Husada"
          address="Jln Seruni"
          pic={Hospital1}
        />
        <ListHospital
          type="Rumah Sakit Anak"
          name="Mangkujiwa"
          address="Jln Kebon Jeruk"
          pic={Hospital2}
        />
        <ListHospital
          type="Rumah Sakit Jiwa"
          name="Gotham City"
          address="Jln Medan Merdeka"
          pic={Hospital3}
        />
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
