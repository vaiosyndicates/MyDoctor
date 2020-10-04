import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {colors} from '../../utils/Colors';
import {Header, Profile, ProfileItem, Button} from '../../component';
import {ILNullPhoto} from '../../assets';

const DoctorProfile = ({route, navigation}) => {
  const dataDoctor = route.params;
  return (
    <View style={styles.page}>
      <Header headerTitle="Profile" onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.content}>
          <Profile
            name={dataDoctor.data.fullName}
            desc={dataDoctor.data.category}
            pic={
              dataDoctor.data.photo ? {uri: dataDoctor.data.photo} : ILNullPhoto
            }
          />
          <ProfileItem label="Alumnus" text={dataDoctor.data.university} />
          <ProfileItem
            label="Tempat Praktik"
            text={dataDoctor.data.hospital_address}
          />
          <ProfileItem label="No. STR" text={dataDoctor.data.str_number} />
          <View style={styles.wrapperButton}>
            <Button
              title="Start Consultation"
              onPress={() => navigation.navigate('Chat', dataDoctor)}
            />
          </View>
        </View>
      </ScrollView>
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
