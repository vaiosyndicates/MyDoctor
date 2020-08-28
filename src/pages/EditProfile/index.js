import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, Input, Button, Profile} from '../../component';
import {colors} from '../../utils/Colors';

const EditProfile = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header headerTitle="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove={true} />
          <View style={{height: 26}} />
          <Input label="Full Name" />
          <View style={{height: 24}} />
          <Input label="Pekerjaan" />
          <View style={{height: 24}} />
          <Input label="Email" />
          <View style={{height: 24}} />
          <Input label="Password" />
          <View style={{height: 40}} />
          <Button
            title="Save Profile"
            onPress={() => navigation.goBack('UserProfile')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
