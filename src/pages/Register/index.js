/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Header, Input, Button, Loading} from '../../component';
import {colors, useForm, storeData, getData, removeValue} from '../../utils';
import {Firebase} from '../../config';
import {showMessage, hideMessage} from 'react-native-flash-message';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullname: '',
    pekerjaan: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const onContinue = () => {
    setLoading(true);
    Firebase.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        setLoading(false);
        setForm('reset');
        const data = {
          fullname: form.fullname,
          pekerjaan: form.pekerjaan,
          email: form.email,
        };
        Firebase.database()
          .ref(`users/${success.user.uid}`)
          .set(data);

        storeData('user', data);
        console.log(JSON.stringify(`sukses : ${success}`));
        navigation.navigate('UploadPhoto', {
          nama: data.fullname,
          pekerjaan: data.pekerjaan,
        });
      })
      .catch(error => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        setLoading(false);
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.alert,
          color: colors.white,
        });
        console.log(JSON.stringify(`error : ${errorMessage}`));
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
      {loading && <Loading />}
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
