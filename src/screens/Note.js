import { View, Text, TouchableOpacity, Image,StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { TextInput } from 'react-native-gesture-handler'
import { openDatabase } from 'react-native-sqlite-storage'
import { useNavigation } from '@react-navigation/native'


let db = openDatabase({name:'UserDatabase2.db'})

const Note = () => {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        db.transaction((txn) => {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                (tx, res) => {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_email VARCHAR(50), user_address VARCHAR(255))',
                            []
                        );
                    }
                    else {
                        console.log("already created table");
                    }
                }
            );
        });
    }, []);

    const saveData = () => {
        db.transaction((txn) => {
            txn.executeSql(
                'INSERT INTO table_user( user_name, user_email, user_address ) VALUES (?,?,?)',
                [name, email, address],
                (tex,res)=>{
                    if(res.rowsAffected == 1) {
                        navigation.goBack();
                    }else {
                        console.log(res);
                    }
                },
                (error)=>{
                    console.log(error);
                }
            );
        });
    }

    return (
        <View style={{ flex: 1,backgroundColor:'#fff' }}>
                  <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#8e8e8e" translucent = {true}/>


            <View style={{ flexDirection: 'row', marginTop: 50, justifyContent: 'flex-start', marginHorizontal: 30 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
                    <Image source={require('../images/backArrow.png')} style={{ height: responsiveHeight(3), width: responsiveWidth(7), marginTop: 6 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 6, marginLeft: 90 }} >Add user</Text>
            </View>

            <View style={{ justifyContent: 'center', alignSelf: 'center', height: 50, width: '90%', borderWidth: 0.5, borderRadius: 10, marginTop: 50, paddingHorizontal: 10 }}>
                <TextInput placeholder='Enter user name' value={name}  onChangeText={txt => setName(txt)} />
            </View>

            <View style={{ justifyContent: 'center', alignSelf: 'center', height: 50, width: '90%', borderWidth: 0.5, borderRadius: 10, marginTop: 30, paddingHorizontal: 10 }}>
                <TextInput placeholder='Enter user Email' value={email} inputMode='email' onChangeText={txt => setEmail(txt)} />
            </View>

            <View style={{ justifyContent: 'center', alignSelf: 'center', height: 50, width: '90%', borderWidth: 0.5, borderRadius: 10, marginTop: 30, paddingHorizontal: 10 }}>
                <TextInput placeholder='Enter user address' value={address} onChangeText={txt => setAddress(txt)} />
            </View>

            <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', height: 50, width: '90%', backgroundColor: '#000', borderWidth: 0.5, borderRadius: 10, marginTop: 100, paddingHorizontal: 10 }}
            onPress={()=>{saveData()}}>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: '#fff' }}>Save User</Text>
            </TouchableOpacity>


        </View>
    )
}

export default Note