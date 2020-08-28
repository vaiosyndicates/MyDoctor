import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button} from '../../atom';
import {Doctor3} from '../../../assets';

const DarkProfile = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Button
        title="Back"
        type="icon-only"
        icon="back-light"
        onPress={onPress}
      />
      <View style={styles.profiles}>
        <Text style={styles.name}>Lila Irwan</Text>
        <Text style={styles.category}>Dokter Anak</Text>
      </View>
      <Image source={Doctor3} style={styles.avatar} />
    </View>
  );
};

export default DarkProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profiles: {
    flex: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  category: {
    fontFamily: fonts.primary.normal,
    fontSize: 14,
    textAlign: 'center',
    color: colors.text.third,
  },
});
