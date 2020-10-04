import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from '../../component';
import {colors, fonts, getData} from '../../utils';
import {Doctor1, Doctor2, Doctor3, ILNullPhoto} from '../../assets';
import {Firebase} from '../../config';
import {useFocusEffect} from '@react-navigation/native';

const Message = ({navigation}) => {
  const [userID, setUserID] = useState({});
  const [history, setHistory] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getProfileLocal();
      const urlHistory = `messages/${userID.uid}`;
      const rootDB = Firebase.database().ref();
      const messagesDB = rootDB.child(urlHistory);

      Firebase.database()
        .ref(urlHistory)
        .on('value', async snapshot => {
          if (snapshot.val()) {
            const oldData = snapshot.val();
            const newData = [];

            const promises = await Object.keys(oldData).map(async key => {
              const urlDoctor = `doctors/${oldData[key].uidPartner}`;
              const detailDoctor = await rootDB.child(urlDoctor).once('value');

              newData.push({
                id: key,
                detailDoctor: detailDoctor.val(),
                ...oldData[key],
              });
            });

            await Promise.all(promises);
            setHistory(newData);
          }
        });
    }, [userID.uid]),
  );

  const getProfileLocal = () => {
    getData('user').then(res => {
      setUserID(res);
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Messages</Text>
        {history.map((cur, i) => {
          const dataDoctor = {
            id: cur.detailDoctor.uid,
            data: cur.detailDoctor,
          };

          return (
            <List
              key={cur.id}
              pic={
                cur.detailDoctor.photo
                  ? {uri: cur.detailDoctor.photo}
                  : ILNullPhoto
              }
              name={cur.detailDoctor.fullName}
              excerpt={cur.lastContentChat}
              onPress={() => navigation.navigate('Chat', dataDoctor)}
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
