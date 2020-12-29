// Renders the User Screen

import { View, SafeAreaView } from 'react-native';

import React, { useEffect, useState } from 'react';

import { Avatar, Title, Caption, Text } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../Styles'

const Profile = require('../Models/Profile').Profile

// Fetches the data from the API then renders the data with styling
function userScreen ({navigation}) {

    const [avatarUrl, setAvatarUrl] = useState('!');
    const [bio, setBio] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [email, setEmail] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [repositories , setRepositories] = useState('');
    const [followers, setFollowers] = useState('');
    const [following, setFollowing] = useState('');
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState(false);

    useEffect(()=> {
      let profile = new Profile(global.login)
      profile.query().then((user_data) =>{
        setAvatarUrl(user_data.avatarUrl)
        setBio(user_data.bio)
        setCreatedAt(user_data.createdAt)
        setEmail(user_data.email)
        setWebsiteUrl(user_data.websiteUrl)
        setLogin(user_data.login)
        setName(user_data.name)
        setRepositories(user_data.repositories.totalCount)
        setFollowers(user_data.followers.totalCount)
        setFollowing(user_data.following.totalCount)
        setLoading(false)
      }).catch((error) => {
        setError(true)
        setLoading(false)
      });
    }, [navigation])
    if(loading || login === ""){
      return(
        <SafeAreaView style={styles.container}>
          <Title>
            Loading!
          </Title>
        </SafeAreaView>
      );
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
        <SafeAreaView style={styles.container}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image 
                source={{
                  uri: avatarUrl
                }}
                size={80}
              />
              <View style={{marginLeft: 20}}>
                <Title style={[styles.title, {
                  marginTop:15,
                  marginBottom: 5,
                }]}>{name}</Title>
                <Caption style={styles.caption}>{login}</Caption>
              </View>
            </View>
          </View>
          <Text>
            {bio}
          </Text>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name='clock' color='#777777' size={20}/>
              <Text style={{color:'#777777', marginLeft: 20}}>{createdAt}</Text>
            </View>
            <View style={styles.row}>
              <Icon name='web' color='#777777' size={20}/>
              <Text style={{color:'#777777', marginLeft: 20}}>{websiteUrl}</Text>
            </View>
            <View style={styles.row}>
              <Icon name='email' color='#777777' size={20}/>
              <Text style={{color:'#777777', marginLeft: 20}}>{email}</Text>
            </View>
          </View>
    
          <View style={styles.infoBoxWrapper}>
              <View style={[styles.infoBox, {
                borderRightColor: '#dddddd',
                borderRightWidth: 1
              }]}>
                <Title>{followers}</Title>
                <Caption>Followers</Caption>
              </View>
              <View style={styles.infoBox}>
                <Title>{following}</Title>
                <Caption>Following</Caption>
              </View>
          </View>
          <View style={styles.infoBoxWrapperBig}>
              <View style={styles.infoBox}>
                <Title>{repositories}</Title>
                <View style={styles.menuItem}>
                  <Icon name='source-branch' color='#FF6347' size={25}/>
                  <Text style={styles.menuItemText}>Public Repositories</Text>
                </View>
              </View>
          </View>
        </SafeAreaView>
      );
    }
}

export default userScreen;
  