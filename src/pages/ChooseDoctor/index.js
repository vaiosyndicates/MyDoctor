import React, {useEffect, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, List} from '../../component';
import {ILNullPhoto} from '../../assets';
import {colors, showError, parseArray} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {Firebase} from '../../config';

const ChooseDoctor = ({navigation, route}) => {
  const itemCategory = route.params;
  const dispatch = useDispatch();
  const categoryEachDoctor = useSelector(state => state.categoryEachDoctors);

  useEffect(() => {
    getDoctorCategories();
  }, [getDoctorCategories]);

  const getDoctorCategories = useCallback(() => {
    Firebase.database()
      .ref('doctors/')
      .orderByChild('category')
      .equalTo(itemCategory.category)
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = parseArray(res.val());
          dispatch({type: 'GET_CATEGORY_EACH_DOCTOR', value: data});
        } else {
          dispatch({type: 'GET_CATEGORY_EACH_DOCTOR', value: {}});
        }
      })
      .catch(err => {
        showError(err.message);
      });
  }, [dispatch, itemCategory.category]);

  return (
    <View style={styles.page}>
      <Header
        type="dark"
        headerTitle={`Pilih Dokter ${itemCategory.category}`}
        onPress={() => navigation.goBack()}
      />
      {categoryEachDoctor.length > 0 &&
        categoryEachDoctor.map((cur, i) => {
          return (
            <List
              type="hasNext"
              pic={cur.data.photo ? {uri: cur.data.photo} : ILNullPhoto}
              name={cur.data.fullName}
              excerpt={cur.data.gender}
              onPress={() => navigation.navigate('DoctorProfile', cur)}
            />
          );
        })}
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
