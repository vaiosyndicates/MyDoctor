import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts, colors} from '../../../utils';

const IsMe = ({text, date}) => {
  return (
    <View style={styles.container}>
      <View style={styles.chatContent}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

export default IsMe;

const styles = StyleSheet.create({
  chatContent: {
    maxWidth: '70%',
    backgroundColor: colors.cardLight,
    padding: 12,
    paddingRight: 18,
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingRight: 16,
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
});
