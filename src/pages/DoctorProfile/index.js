import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../utils/Colors';
import {Header, Profile, ProfileItem, Button} from '../../component';

const DoctorProfile = ({route, navigation}) => {
  const {name} = route.params;
  const {desc} = route.params;
  return (
    <View style={styles.page}>
      <Header headerTitle="Profile" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Profile name={name} desc={desc} />
        <ProfileItem label="Alumnus" text="Universitas Indonesia, 2020" />
        <ProfileItem label="Tempat Praktik" text="Rusah Sakit Umum Bandung" />
        <ProfileItem label="No. STR" text="080989999" />
        <View style={styles.wrapperButton}>
          <Button
            title="Start Consultation"
            onPress={() => navigation.navigate('Chat')}
          />
        </View>
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapperButton: {
    paddingHorizontal: 40,
    paddingVertical: 23,
  },
});
