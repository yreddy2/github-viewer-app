import { SafeAreaView } from 'react-native';

import React, { useEffect, useState } from 'react';

import { Title, Text } from 'react-native-paper';

import { ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../Styles';

const Repository = require('../Models/Repository').Repository

// Fetches the data from the API then renders the data with styling
const repositoriesScreen = () => {

    const [repositoryList, setRepositoryList] = useState([]);
    const [err, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
      let repository = new Repository(global.login);
      repository.query().then((user_data) => {
        setRepositoryList(user_data.repositories.nodes);
        setLoading(false)
      }).catch((error) => {
        throw error;
        setError(true)
        setLoading(false)
      });
    }, [])
    if(loading || !repositoryList.length){
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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
          <SafeAreaView>
            <Title style={{marginBottom: 10, marginTop: 10}}>
              Public Repositories
            </Title>
          </SafeAreaView>
          <ScrollView>
            { repositoryList.map((item) =>{
              return (
                <SafeAreaView key={item.id}>
                  <SafeAreaView
                    style={{
                      borderBottomColor: 'darkgrey',
                      borderBottomWidth: 1,
                      marginBottom: 10,
                    }}
                  />
                  <SafeAreaView style={styles.row}>
                    <Icon name="source-branch" color="#777777" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>{item.name}</Text>
                  </SafeAreaView>
                  <SafeAreaView style={styles.row}>
                    <Icon name="face" color="#777777" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>{item.owner.login}</Text>
                  </SafeAreaView>
                  <SafeAreaView style={styles.row}>
                    <Icon name="book-open" color="#777777" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>{item.description}</Text>
                  </SafeAreaView>
                </SafeAreaView>
              )
            })}
          </ScrollView>
        </SafeAreaView>
      );
    }
}

export default repositoriesScreen;