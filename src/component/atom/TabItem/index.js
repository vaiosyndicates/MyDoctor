import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  IconDoctor,
  IconMessages,
  IconMaps,
  IconDoctorActive,
  IconMessagesActive,
  IconMapsActive,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

const TabItem = ({type, title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (type === 'Doctor') {
      return active ? <IconDoctorActive /> : <IconDoctor />;
    } else if (type === 'Messages') {
      return active ? <IconMessagesActive /> : <IconMessages />;
    } else if (type === 'Hospital') {
      return active ? <IconMapsActive /> : <IconMaps />;
    } else {
      return <IconDoctor />;
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: active => ({
    color: active ? colors.text.active : colors.text.inactive,
    fontSize: 10,
    fontFamily: fonts.primary.normal,
    marginTop: 4,
  }),
});
