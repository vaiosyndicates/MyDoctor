import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from '../../component';
import {colors, fonts} from '../../utils';
import {Doctor1, Doctor2, Doctor3} from '../../assets';

const Message = ({navigation}) => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      profile: Doctor1,
      name: 'Nia Irwan',
      excerpt: 'Baik ibu terima kasih waktunya ....',
    },
    {
      id: 2,
      profile: Doctor2,
      name: 'Christabel Chua',
      excerpt: 'Pakai obat ini saja ....',
    },
    {
      id: 3,
      profile: Doctor3,
      name: 'Cut Tari',
      excerpt: 'Ok bu dimohon untuk menggunakan masker ....',
    },
  ]);
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Messages</Text>
        {doctors.map((cur, i) => {
          return (
            <List
              key={cur.id}
              pic={cur.profile}
              name={cur.name}
              excerpt={cur.excerpt}
              onPress={() => navigation.navigate('Chat')}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Message;

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
  pageTitle: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginLeft: 16,
    marginTop: 30,
    marginBottom: 16,
  },
});
