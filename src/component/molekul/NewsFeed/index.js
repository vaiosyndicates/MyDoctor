import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {News1} from '../../../assets';
import {fonts, colors} from '../../../utils';

const NewsFeed = ({title, date, thumbnail, id, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} key={id}>
      <View style={styles.content}>
        <Text style={styles.newsTitle}>{title}</Text>
        <Text style={styles.timestamp}>{date}</Text>
      </View>
      <Image source={{uri: thumbnail}} style={styles.thumbnail} />
    </TouchableOpacity>
  );
};

export default NewsFeed;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginBottom: 14,
    maxWidth: '90%',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
  },
  thumbnail: {
    width: 80,
    height: 60,
    borderRadius: 11,
  },
});
