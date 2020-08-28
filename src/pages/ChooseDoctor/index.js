import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, List} from '../../component';
import {Doctor3, Doctor2, Doctor1} from '../../assets';
import {colors} from '../../utils';

const ChooseDoctor = ({navigation, route}) => {
  const {category} = route.params;
  return (
    <View style={styles.page}>
      <Header
        type="dark"
        headerTitle={`Pilih Dokter ${category}`}
        onPress={() => navigation.goBack()}
      />
      <List
        type="hasNext"
        pic={Doctor1}
        name="John Doe"
        excerpt="Wanita"
        onPress={() => navigation.navigate('Chat')}
      />
      <List
        type="hasNext"
        pic={Doctor2}
        name="Jane Doe"
        excerpt="Wanita"
        onPress={() => navigation.navigate('Chat')}
      />
      <List
        type="hasNext"
        pic={Doctor1}
        name="John Dawson"
        excerpt="Pria"
        onPress={() => navigation.navigate('Chat')}
      />
      <List
        type="hasNext"
        pic={Doctor2}
        name="Jessica Lie"
        excerpt="Wanita"
        onPress={() => navigation.navigate('Chat')}
      />
      <List type="hasNext" pic={Doctor3} name="John Lebron" excerpt="Pria" />
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
