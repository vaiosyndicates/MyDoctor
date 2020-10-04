import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILCatUmum, ILCatObat, ILCatAnak, ILCatPsikiater} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DoctorCategory = ({category, onPress}) => {
  const Icon = () => {
    if (category === 'umum') {
      return <ILCatUmum style={styles.illustration} />;
    }
    if (category === 'obat') {
      return <ILCatObat style={styles.illustration} />;
    }
    if (category === 'anak') {
      return <ILCatAnak style={styles.illustration} />;
    }
    if (category === 'psikiater') {
      return <ILCatPsikiater style={styles.illustration} />;
    }
    return <ILCatUmum style={styles.illustration} />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon />
      <Text style={styles.label}>Saya butuh</Text>
      <Text style={styles.bold}>{category}</Text>
    </TouchableOpacity>
  );
};

export default DoctorCategory;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.cardLight,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginRight: 10,
    width: 100,
    height: 150,
  },
  illustration: {
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  bold: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
