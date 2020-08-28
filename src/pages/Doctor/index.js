import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  HomeProfile,
  DoctorCategory,
  RatedDoctor,
  NewsFeed,
} from '../../component';
import {JSONCategory, Doctor1, Doctor2, Doctor3} from '../../assets';
import {fonts, colors} from '../../utils';

const Doctor = ({navigation}) => {
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{height: 30}} />
          <View style={styles.wrapperContent}>
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcomeText}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <View style={{width: 32}} />
                {JSONCategory.data.map((cur, i) => {
                  return (
                    <DoctorCategory
                      key={cur.id}
                      category={cur.category}
                      onPress={() =>
                        navigation.navigate('ChooseDoctor', {
                          category: cur.category,
                        })
                      }
                    />
                  );
                })}
                <View style={{width: 22}} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperContent}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            <RatedDoctor
              avatar={Doctor1}
              name="Nia Irwan"
              desc="Dokter Anak"
              onPress={() =>
                navigation.navigate('DoctorProfile', {
                  name: 'Nia Irwan',
                  desc: 'Dokter Anak',
                })
              }
            />
            <RatedDoctor
              avatar={Doctor2}
              name="Jackson Tiago"
              desc="Dokter Obat"
              onPress={() =>
                navigation.navigate('DoctorProfile', {
                  name: 'Jackson Tiago',
                  desc: 'Dokter Obat',
                })
              }
            />
            <RatedDoctor
              avatar={Doctor3}
              name="John Doe"
              desc="Dokter Psikiater"
              onPress={() =>
                navigation.navigate('DoctorProfile', {
                  name: 'John Doe',
                  desc: 'Dokter Psikiater',
                })
              }
            />
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          <NewsFeed />
          <NewsFeed />
          <NewsFeed />
          <View style={{height: 30}} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 20,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
    maxWidth: 209,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
  wrapperContent: {
    paddingHorizontal: 16,
  },
});
