import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {fonts, colors} from '../../../utils';
import {Doctor3} from '../../../assets';

const IsReceiver = () => {
  return (
    <View style={styles.container}>
      <Image source={Doctor3} style={styles.avatar} />
      <View>
        <View style={styles.chatContent}>
          <Text style={styles.text}>
            Ibu dokter, apakah memakan jeruk tiap hari itu buruk?
          </Text>
        </View>
        <Text style={styles.date}>4.20 AM</Text>
      </View>
    </View>
  );
};

export default IsReceiver;

const styles = StyleSheet.create({
  chatContent: {
    maxWidth: '80%',
    backgroundColor: colors.primary,
    padding: 12,
    paddingRight: 18,
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingLeft: 16,
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
});