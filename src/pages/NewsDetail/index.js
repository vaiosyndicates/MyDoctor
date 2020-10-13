import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ILHospitalBG} from '../../assets';
import {Header} from '../../component';
import {Firebase} from '../../config';
import {colors, fonts} from '../../utils';

const NewsDetail = ({navigation, route}) => {
  const newsData = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <ImageBackground
        source={newsData.thumbnail ? {uri: newsData.thumbnail} : ILHospitalBG}
        style={styles.background}>
        <Text style={styles.pageTitle}>{newsData.title}</Text>
        <Text style={styles.room}>{newsData.date}</Text>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.text}>{newsData.body}</Text>
      </View>
    </ScrollView>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
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
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14,
  },
  text: {
    marginHorizontal: 15,
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
  },
});
