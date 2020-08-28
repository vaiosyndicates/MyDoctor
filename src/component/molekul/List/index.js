import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  IconChevronRight,
  IconAccount,
  IconLanguange,
  IconStar,
  IconDescription,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

const List = ({pic, name, excerpt, type, onPress, icon}) => {
  const Icon = () => {
    if (icon === 'edit-profile') {
      return <IconAccount />;
    }
    if (icon === 'edit-languange') {
      return <IconLanguange />;
    }
    if (icon === 'edit-rate') {
      return <IconStar />;
    }
    if (icon === 'edit-help') {
      return <IconDescription />;
    }
    return <IconAccount />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? <Icon /> : <Image source={pic} style={styles.avatar} />}
      <View style={styles.content(icon)}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.excerpt}>{excerpt}</Text>
      </View>
      {type === 'hasNext' && <IconChevronRight />}
    </TouchableOpacity>
  );
};

export default List;

const styles = StyleSheet.create({
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 4,
  },
  content: icon => ({
    flex: 1,
    marginLeft: icon ? 16 : 0,
  }),
  excerpt: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
  },
});
