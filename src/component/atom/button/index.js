import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils';
import IconOnly from './IconOnly';
import ButtonIconSend from './btnIcon';

const Button = ({type, title, onPress, icon, disable}) => {
  if (type === 'icon-only') {
    return <IconOnly icon={icon} onPress={onPress} />;
  }
  if (type === 'button-icon-send') {
    return <ButtonIconSend onPress={onPress} disable={disable} />;
  }
  if (disable === true) {
    return (
      <View style={styles.disableBg}>
        <Text style={styles.textDisable}>{title}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor:
      type === 'sigin'
        ? colors.button.secondary.background
        : colors.button.primary.background,
    paddingVertical: 10,
    borderRadius: 10,
  }),
  disableBg: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.button.disable.background,
  },
  textDisable: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
    color: colors.button.disable.text,
  },
  text: type => ({
    fontWeight: '600',
    fontSize: 16,
    color:
      type === 'sigin'
        ? colors.button.secondary.text
        : colors.button.primary.text,
    textAlign: 'center',
  }),
});
