/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ILLogo} from '../../assets';
import {Input, Button, Link} from '../../component';
import {colors, fonts, useForm, storeData, showError} from '../../utils';
import {Firebase} from '../../config';
import {useDispatch} from 'react-redux';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const signIn = () => {
    dispatch({type: 'SET_LOADING', value: true});
    try {
      Firebase.auth()
        .signInWithEmailAndPassword(form.email, form.password)
        .then(res => {
          dispatch({type: 'SET_LOADING', value: false});
          Firebase.database()
            .ref(`users/${res.user.uid}/`)
            .once('value')
            .then(response => {
              if (response.val()) {
                storeData('user', response.val());
                dispatch({type: 'SAVE_USER', value: response.val()});
                navigation.replace('MainApp');
              }
            });
        })
        .catch(err => {
          dispatch({type: 'SET_LOADING', value: false});
          setForm('reset');
          showError(err.message);
        });
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      setForm('reset');
      showError(error.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <ILLogo />
            <Text style={styles.text}>Masuk dan mulai berkonsultasi</Text>
          </View>
          <View>
            <Input
              label="Email Address"
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />
          </View>
          <View style={{height: 24}} />
          <View>
            <Input
              label="Password"
              value={form.password}
              onChangeText={value => setForm('password', value)}
              secureTextEntry
            />
          </View>
          <View style={{height: 10}} />
          <Link title="Forgot My Password" size={12} align="left" />
          <View style={{height: 40}} />
          <Button title="Sign In" onPress={() => signIn()} />
          <View style={{height: 30}} />
          <Link
            title="Create New Account"
            size={16}
            align="center"
            onPress={() => navigation.navigate('Register')}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 40,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153,
  },
  form: {
    marginBottom: 24,
  },
});
