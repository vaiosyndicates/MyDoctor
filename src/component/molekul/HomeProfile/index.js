import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {ILNullPhoto} from '../../../assets';
import {fonts, colors, getData} from '../../../utils';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const HomeProfile = ({navigation, onPress}) => {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    pekerjaan: '',
  });

  const stateGlobal = useSelector(state => state.profile);

  useFocusEffect(
    React.useCallback(() => {
      const getProfiledata = async () => {
        try {
          const user = await getData('user');
          const data = user;
          data.photo = data.photo ? {uri: user.photo} : ILNullPhoto;
          setProfile(data);
        } catch (e) {
          console.log(e);
        }
      };

      getProfiledata();
    }, []),
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={stateGlobal.photo ? {uri: stateGlobal.photo} : ILNullPhoto}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{stateGlobal.fullname}</Text>
        <Text style={styles.userJob}>{stateGlobal.pekerjaan}</Text>
      </View>
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  userJob: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
  },
});
