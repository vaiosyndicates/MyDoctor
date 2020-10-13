import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Hospital3, Hospital1} from '../../../assets';
import {fonts, colors} from '../../../utils';

const ListHospital = ({type, name, address, pic, id}) => {
  return (
    <View style={styles.container} key={id}>
      <Image source={{uri: pic}} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{type}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  );
};

export default ListHospital;

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 60,
    borderRadius: 11,
    marginRight: 16,
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  address: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    marginTop: 6,
  },
});
