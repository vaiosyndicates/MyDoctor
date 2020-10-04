import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Header, Profile, List} from '../../component';
import {colors, getData, showError} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {Firebase} from '../../config';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const UserProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullname: '',
    pekerjaan: '',
    photo: ILNullPhoto,
  });
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      getData('user').then(res => {
        const data = res;
        data.photo = data.photo ? {uri: res.photo} : ILNullPhoto;
        setProfile(data);
      });
    }, []),
  );

  // useEffect(() => {
  //   getData('user').then(res => {
  //     const data = res;
  //     data.photo = {uri: res.photo};
  //     setProfile(data);
  //   });
  // }, [navigation]); // Only re-run the effect if count changes

  const signOut = () => {
    try {
      Firebase.auth()
        .signOut()
        .then(res => {
          dispatch({type: 'LOG_OUT'});
          navigation.replace('GetStarted');
        })
        .catch(err => {
          showError(err.message);
        });
    } catch (error) {
      showError(error);
    }
  };

  return (
    <View style={styles.page}>
      <Header headerTitle="Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height: 10}} />
        {profile.fullname.length > 0 && (
          <Profile
            name={profile.fullname}
            desc={profile.pekerjaan}
            pic={profile.photo}
            isRemove={false}
          />
        )}
        <View style={{height: 14}} />
        <List
          icon="edit-account"
          name="Edit Profile"
          excerpt="Last updated yesterday"
          type="hasNext"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <List
          icon="edit-languange"
          name="Languange"
          excerpt="Availavle 12 languanges"
          type="hasNext"
        />
        <List
          icon="edit-rate"
          name="Give Us Rate"
          excerpt="On Google Play Store"
          type="hasNext"
        />
        <List
          icon="edit-help"
          name="Sign Out"
          excerpt="Read out Guidelines"
          type="hasNext"
          onPress={() => signOut()}
        />
      </ScrollView>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
