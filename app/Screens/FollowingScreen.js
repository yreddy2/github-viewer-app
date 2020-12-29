import { View, SafeAreaView, TouchableOpacity } from 'react-native';

import React, { useEffect, useState } from 'react';

import { Avatar, Title, Caption } from 'react-native-paper';

import { ScrollView } from 'react-native-gesture-handler';

import { CommonActions } from "@react-navigation/native";

import styles from '../Styles'

const Following = require('../Models/Following').Following

// Fetches the data from the API then renders the data with styling
function followingScreen({navigation}) {
    const [followingList, setFollowingList] = useState([]);
    const [err, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
      let following = new Following(global.login);
      following.query().then((user_data) => {
        setFollowingList(user_data.following.nodes);
        setLoading(false)
      }).catch((error) => {
        throw error;
        setError(true)
        setLoading(false)
      });
    }, [])
    const pressHandler = (login) => {
      global.login = login
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'User'}
          ]
        })
      );
    }

    if(loading){
      return (
        <SafeAreaView style={styles.container}>
          <Title>
            Loading!
          </Title>
        </SafeAreaView>
      )
    } else if(err){
      return (
        <SafeAreaView style={styles.container}>
          <Title>
            Error Fetching Data!
          </Title>
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <SafeAreaView>
            <Title style={{marginBottom: 10, marginTop: 10}}>
              Following
            </Title>
          </SafeAreaView>
          <ScrollView>
            { followingList.map((item) =>{
              return (
                <SafeAreaView key={item.id}>
                  <View
                    style={{
                      borderBottomColor: 'darkgrey',
                      borderBottomWidth: 1,
                      marginBottom: 10,
                      marginTop: 25
                    }}
                  />
                  <TouchableOpacity onPress={() => pressHandler(item.login)}>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                      <Avatar.Image 
                        source={{
                          uri: item.avatarUrl
                        }}
                        size={80}
                      />
                      <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {
                          marginTop:15,
                          marginBottom: 5,
                        }]}>{item.name}</Title>
                        <Caption style={styles.caption}>{item.login}</Caption>
                      </View>
                    </View>
                  </TouchableOpacity>
                </SafeAreaView>
              )
            })}
          </ScrollView>
        </SafeAreaView>
      );
    }
}

export default followingScreen;