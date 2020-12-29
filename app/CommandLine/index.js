// File contains functions that call the model classes to get data for the CLI interface

const Followers = require('../Models/Followers')

const Following = require('../Models/Following')

const Profile = require('../Models/Profile')

const Repository = require('../Models/Repository')

// Function to get profile data
const getProfile = (login) => {
    let profile = new Profile.Profile(login)
    profile.query().then((user_data) =>{
        console.info('login: ' + user_data.login)
        console.info('name: ' + user_data.name)
        console.info('email: ' + user_data.email)
        console.info('bio: ' + user_data.bio)
        console.info('created at: ' + user_data.createdAt)
        console.info('website: ' + user_data.websiteUrl)
        console.info('repositories: ' + user_data.repositories.totalCount)
        console.info('followers: ' + user_data.followers.totalCount)
        console.info('following: ' + user_data.following.totalCount)
      }).catch((error) => {
        console.info(error)
      });
}

// Function to get repository data
const getRepository = (login) => {
    let repository = new Repository.Repository(login)
    repository.query().then((user_data) =>{
        let repositoryList = user_data.repositories.nodes
        for(let index = 0; index < repositoryList.length; index++){
            console.info('_________________________________________')
            console.info('owner: ' + repositoryList[index].owner.login)
            console.info('name: ' + repositoryList[index].name)
            console.info('description: ' + repositoryList[index].description)
        }
      }).catch((error) => {
        console.info(error)
      });
}

// Function to get Followers Data
const getFollowers = (login) => {
    let followers = new Followers.Followers(login)
    followers.query().then((user_data) =>{
        let followersList = user_data.followers.nodes
        for(let index = 0; index < followersList.length; index++){
            console.info('_________________________________________')
            console.info('login: ' + followersList[index].login)
            console.info('name: ' + followersList[index].name)
        }
      }).catch((error) => {
        console.info(error)
      });
}

// Function to get Following Data
const getFollowing = (login) => {
    let following = new Following.Following(login)
    following.query().then((user_data) =>{
        let followingList = user_data.following.nodes
        for(let index = 0; index < followingList.length; index++){
            console.info('_________________________________________')
            console.info('login: ' + followingList[index].login)
            console.info('name: ' + followingList[index].name)
        }
      }).catch((error) => {
        console.info(error)
      });
}

module.exports = {
    getProfile,
    getRepository,
    getFollowers,
    getFollowing
}