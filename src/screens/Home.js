import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'

import { FlatList } from 'react-native-gesture-handler'
import { useNavigation, useIsFocused } from '@react-navigation/native'
let db = openDatabase({ name: 'UserDatabase2.db' });
const Home = () => {
  const [userList, setUserList] = useState([])
  const navigation = useNavigation();
  const isFocused = useIsFocused()

  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql("SELECT * FROM table_user", [], (tx, res) => {

        let temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          console.log(res.rows.item(i), "dsfghjk");
          temp.push(res.rows.item(i));
        }
        setUserList(temp);
      });
    });
  }, [isFocused]);


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle='light-content' hidden={false} backgroundColor="#000" translucent={true} />


      <FlatList style={{marginTop:40,marginHorizontal:20}}
        data={userList}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={{ width: '100%', backgroundColor: '#fff', padding: 10,borderBottomWidth:0.5,borderColor:'#000' }}>
              <Text>{'Name: ' + item.user_name}</Text>
              <Text>{'Email: ' + item.user_email}</Text>
              <Text>{'Address: ' + item.user_address}</Text>

            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity onPress={() => navigation.navigate("Note")} style={{ height: 60, width: 180, right: 20, bottom: 20, backgroundColor: '#000', borderRadius: 50, position: 'absolute', justifyContent: 'center' }}>
        <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 20, marginBottom: 5 }}>Add New User</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home