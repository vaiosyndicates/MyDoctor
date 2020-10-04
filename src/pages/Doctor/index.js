import React, {useCallback} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  HomeProfile,
  DoctorCategory,
  RatedDoctor,
  NewsFeed,
} from '../../component';
import {Doctor1, Doctor2, Doctor3, ILNullPhoto} from '../../assets';
import {fonts, colors, showError, parseArray} from '../../utils';
import {useFocusEffect} from '@react-navigation/native';
import {Firebase} from '../../config';
import {useDispatch, useSelector} from 'react-redux';

const Doctor = ({navigation}) => {
  const dispatch = useDispatch();
  const stateGlobal = useSelector(state => state.news);
  const categoryDoctor = useSelector(state => state.categoryDoctors);
  const ratedDoctor = useSelector(state => state.ratedDoctors);

  useFocusEffect(
    React.useCallback(() => {
      getNews();
      getRatedDoctor();
      getCategories();
    }, [getCategories, getNews, getRatedDoctor]),
  );

  const getNews = useCallback(() => {
    Firebase.database()
      .ref('news/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filter = data.filter(el => el !== null);
          dispatch({type: 'GET_NEWS', value: filter});
        }
      })
      .catch(err => {
        showError(err.message);
      });
  }, [dispatch]);

  const getCategories = useCallback(() => {
    Firebase.database()
      .ref('category_doctors/')
      .once('value')
      .then(resDoctor => {
        if (resDoctor.val()) {
          const data = resDoctor.val();
          const filter = data.filter(el => el !== null);
          dispatch({type: 'GET_CATEGORY_DOCTOR', value: filter});
        }
      })
      .catch(errDoctor => {
        showError(errDoctor.message);
      });
  }, [dispatch]);

  const getRatedDoctor = useCallback(() => {
    Firebase.database()
      .ref('doctors/')
      .orderByChild('rate')
      .limitToLast(2)
      .once('value')
      .then(resDoctor => {
        if (resDoctor.val()) {
          const data = parseArray(resDoctor.val());
          dispatch({type: 'GET_RATED_DOCTORS', value: data});
        }
      })
      .catch(errDoctor => {
        showError(errDoctor.message);
      });
  }, [dispatch]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{height: 30}} />
          <View style={styles.wrapperContent}>
            <HomeProfile
              onPress={() => navigation.navigate('UserProfile')}
              navigation={navigation}
            />
            <Text style={styles.welcomeText}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <View style={{width: 32}} />
                {categoryDoctor.map((cur, i) => {
                  return (
                    <DoctorCategory
                      key={`doctorCat_${cur.id}`}
                      category={cur.category}
                      onPress={() => navigation.navigate('ChooseDoctor', cur)}
                    />
                  );
                })}
                <View style={{width: 22}} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperContent}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {ratedDoctor.map((cur, i) => {
              return (
                <RatedDoctor
                  id={cur.id}
                  avatar={cur.data.photo ? {uri: cur.data.photo} : ILNullPhoto}
                  name={cur.data.fullName}
                  desc={cur.data.category}
                  rated={cur.data.rate}
                  onPress={() => navigation.navigate('DoctorProfile', cur)}
                />
              );
            })}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {stateGlobal.map((cur, i) => {
            return (
              <NewsFeed
                id={cur.id}
                title={cur.title}
                date={cur.date}
                thumbnail={cur.thumbnail}
              />
            );
          })}
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
