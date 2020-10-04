import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Profiles, IconDelete} from '../../../assets';
import {colors, fonts} from '../../../utils';

const Profile = ({name, desc, isRemove, pic, onPress}) => {
  return (
    <View style={styles.container}>
      {!isRemove && (
        <View style={styles.wrapperImage}>
          <Image source={pic} style={styles.avatar} />
        </View>
      )}

      {isRemove && (
        <TouchableOpacity style={styles.wrapperImage} onPress={onPress}>
          <Image source={pic} style={styles.avatar} />
          {isRemove && <IconDelete style={styles.deletePhoto} />}
        </TouchableOpacity>
      )}
      {name && desc && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.job}>{desc}</Text>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  wrapperImage: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 2,
    textAlign: 'center',
  },
  job: {
    fontFamily: fonts.primary.normal,
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  deletePhoto: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
});
