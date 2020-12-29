import { View, SafeAreaView, TouchableOpacity } from 'react-native';

import React, { useEffect, useState } from 'react';

import { Avatar, Title, Caption } from 'react-native-paper';

import { ScrollView } from 'react-native-gesture-handler';

import { CommonActions } from "@react-navigation/native";

import styles from '../Styles'

const Followers = require('../Models/Followers').Followers

// Fetches the data from the API then renders the data with styling
function followersScreen({navigation}) {
    const [followersList, setFollowersList] = useState([]);
    const [err, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
      let followers = new Followers(global.login);
      followers.query().then((user_data) => {
        setFollowersList(user_data.followers.nodes);
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
              Followers
            </Title>
          </SafeAreaView>
          <ScrollView>
            { followersList.map((item) =>{
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

export default followersScreen;