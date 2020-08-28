import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Header, Button, Link} from '../../component';
import {ILNullPhoto, IconAdd, IconDelete} from '../../assets';
import {colors, fonts} from '../../utils';
import ImagePicker from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

const UploadPhoto = ({navigation, route}) => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const {nama} = route.params;
  const {pekerjaan} = route.params;

  const getImage = () => {
    if (hasPhoto === false) {
      ImagePicker.launchImageLibrary({}, response => {
        if (response.didCancel) {
          showMessage({
            message: 'Oops sepertinya anda tidak memilih fotonya',
            type: 'default',
            backgroundColor: colors.alert,
            color: colors.white,
          });
        } else if (response.error) {
          showMessage({
            message: 'Network error',
            type: 'default',
            backgroundColor: colors.alert,
            color: colors.white,
          });
        } else {
          const source = {uri: response.uri};
          setPhoto(source);
          setHasPhoto(true);
        }
      });
    } else {
      setPhoto(ILNullPhoto);
      setHasPhoto(false);
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
          <Text style={styles.name}>{nama}</Text>
          <Text style={styles.work}>{pekerjaan}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={() => navigation.replace('MainApp')}
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
