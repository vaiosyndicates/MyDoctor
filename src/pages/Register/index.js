/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Header, Input, Button, Loading} from '../../component';
import {colors, useForm, storeData, showError} from '../../utils';
import {Firebase} from '../../config';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullname: '',
    pekerjaan: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const onContinue = () => {
    dispatch({type: 'SET_LOADING', value: true});
    Firebase.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        dispatch({type: 'SET_LOADING', value: false});
        setForm('reset');
        const data = {
          fullname: form.fullname,
          pekerjaan: form.pekerjaan,
          email: form.email,
          uid: success.user.uid,
        };
        Firebase.database()
          .ref(`users/${success.user.uid}`)
          .set(data);

        storeData('user', data);
        dispatch({type: 'SAVE_USER', value: data});
        navigation.navigate('UploadPhoto', data);
      })
      .catch(error => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(error.message);
      });
  };
  return (
    <>
      <View style={styles.page}>
        <Header onPress={() => navigation.goBack()} headerTitle="Daftar Akun" />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              value={form.fullname}
              onChangeText={value => setForm('fullname', value)}
            />
            <View style={{height: 24}} />
            <Input
              label="Pekerjaan"
              value={form.pekerjaan}
              onChangeText={value => setForm('pekerjaan', value)}
            />
            <View style={{height: 24}} />
            <Input
              label="Email Address"
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />
            <View style={{height: 24}} />
            <Input
              label="Password"
              value={form.password}
              onChangeText={value => setForm('password', value)}
              secureTextEntry
            />
            <View style={{height: 40}} />
            <Button title="Continue" onPress={() => onContinue()} />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  content: {
    padding: 40,
    paddingTop: 0,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
