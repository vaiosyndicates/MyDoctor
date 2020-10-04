import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IconSendDisable, IconSendActive} from '../../../assets';
import {colors} from '../../../utils';

const ButtonIconSend = ({disable, onPress}) => {
  if (disable) {
    return (
      <View style={styles.container(disable)}>
        {disable && <IconSendDisable />}
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container(disable)} onPress={onPress}>
      {disable && <IconSendDisable />}
      {!disable && <IconSendActive />}
    </TouchableOpacity>
  );
};

export default ButtonIconSend;

const styles = StyleSheet.create({
  container: disable => ({
    backgroundColor:
      disable === true ? colors.disable : colors.button.active.background,
    width: 45,
    height: 45,
    borderRadius: 10,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 8,
    paddingLeft: 8,
  }),
});
