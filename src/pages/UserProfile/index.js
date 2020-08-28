import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Profile, List} from '../../component';
import {colors} from '../../utils';

const UserProfile = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header headerTitle="Profile" onPress={() => navigation.goBack()} />
      <View style={{height: 10}} />
      <Profile name="Lila Irwan" desc="Frontend Developer" isRemove={false} />
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
        name="Help Center"
        excerpt="Read out Guidelines"
        type="hasNext"
      />
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
