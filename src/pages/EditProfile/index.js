import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Header, Input, Button, Profile} from '../../component';
import {colors, getData, storeData, showError, removeValue} from '../../utils';
import {Firebase} from '../../config';
import {ILNullPhoto} from '../../assets';
import {useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

const EditProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullname: '',
    pekerjaan: '',
    email: '',
  });

  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoData, setPhotoData] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      const pic = data.photo ? {uri: res.photo} : ILNullPhoto;
      setPhoto(pic);
      setPhotoData(data.photo);
      setProfile(data);
    });
  }, []);

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    const options = {
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        showError('Oops sepertinya anda tidak memilih fotonya');
      } else if (response.error) {
        showError('Bad Network');
      } else {
        const source = {uri: response.uri};
        setPhotoData(`data:${response.type};base64, ${response.data}`);
        setPhoto(source);
      }
    });
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = photoData;

    Firebase.database()
      .ref(`users/${data.uid}/`)
      .update(data)
      .then(res => {
        storeData('user', data);
        dispatch({type: 'SAVE_USER', value: data});
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const updatePasswordData = () => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.updatePassword(password).catch(errPw => {
          showError(errPw.message);
        });
      }
    });
  };

  const updateProfile = () => {
    const data = profile;
    data.photo = photoData;
    try {
      if (password.length > 0) {
        if (password.length < 6) {
          showError('Password minimal 6 karakter');
        } else {
          updatePasswordData();
          updateProfileData();
          navigation.replace('MainApp');
        }
      } else {
        updateProfileData();
        navigation.replace('MainApp');
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <View style={styles.page}>
      <Header headerTitle="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove={true} pic={photo} onPress={() => getImage()} />
          <View style={{height: 26}} />
          <Input
            label="Full Name"
            value={profile.fullname}
            onChangeText={value => changeText('fullname', value)}
          />
          <View style={{height: 24}} />
          <Input
            label="Pekerjaan"
            value={profile.pekerjaan}
            onChangeText={value => changeText('pekerjaan', value)}
          />
          <View style={{height: 24}} />
          <Input label="Email" value={profile.email} disable />
          <View style={{height: 24}} />
          <Input
            label="Password"
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry
          />
          <View style={{height: 40}} />
          <Button title="Save Profile" onPress={() => updateProfile()} />
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
