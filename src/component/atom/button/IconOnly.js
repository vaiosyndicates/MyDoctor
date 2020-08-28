import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IconBack, IconBackLight} from '../../../assets';

const IconOnly = ({onPress, icon}) => {
  const Icon = () => {
    if (icon === 'back-dark') {
      return <IconBack />;
    }
    if (icon === 'back-light') {
      return <IconBackLight />;
    }
    return <IconBack />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;

const styles = StyleSheet.create({});
