import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Header, Button, Link} from '../../component';
import {ILNullPhoto, IconAdd, IconDelete} from '../../assets';
import {colors, fonts, storeData, showError} from '../../utils';
import ImagePicker from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {Firebase} from '../../config';
import {useDispatch} from 'react-redux';

const UploadPhoto = ({navigation, route}) => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoData, setPhotoData] = useState('');
  const {fullname, pekerjaan, uid} = route.params;
  const dispatch = useDispatch();

  const getImage = () => {
    if (hasPhoto === false) {
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
          setHasPhoto(true);
        }
      });
    } else {
      setPhotoData('');
      setPhoto(ILNullPhoto);
      setHasPhoto(false);
    }
  };

  const uploadImage = () => {
    try {
      Firebase.database()
        .ref(`users/${uid}/`)
        .update({photo: photoData});

      const data = route.params;
      data.photo = photoData;
      storeData('user', data);
      dispatch({type: 'SAVE_USER', value: data});
      navigation.replace('MainApp');
    } catch (error) {
      showError(error);
    }
  };
  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} headerTitle="Upload Photo" />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={() => getImage()}>
            <Image source={photo} style={styles.avatar} />
            <IconAdd style={styles.addPhoto} />
            {hasPhoto && <IconDelete style={styles.addPhoto} />}
            {!hasPhoto && <IconAdd style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullname}</Text>
          <Text style={styles.work}>{pekerjaan}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={() => uploadImage()}
          />
          <View style={{height: 30}} />
          <Link
            title="Skip for this"
            align="center"
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  work: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 4,
  },
});
