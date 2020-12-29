import 'react-native';
const Profile = require('../Models/Profile').Profile
const Repository = require('../Models/Repository').Repository
global.fetch = require("node-fetch");

test('Get Certain User Test', () => {
    let profile = new Profile('yreddy2')
    profile.query().then((user_data) =>{
    expect(user_data.login).toBe('yreddy2')});
});

test('Get No User Test', () => {
    let profile = new Profile('')
    profile.query().then((user_data) =>{
    expect(user_data.login).toBe(null)});
});

test('Get Other User Test', () => {
    let profile = new Profile('reddy')
    profile.query().then((user_data) =>{
    expect(user_data.repositories.totalCount).toBe(0)});
});

test('Get Certain User Test', () => {
    let repository = new Repository('yreddy2')
    repository.query().then((user_data) =>{
    expect(user_data.repositories.totalCount).toBe(19)});
});

test('Get Certain User Test', () => {
    let repository = new Repository('')
    repository.query().then((user_data) =>{
    expect(user_data.repositories.totalCount).toBe(null)});
});

test('Get Certain User Test', () => {
    let repository = new Repository('reddy')
    repository.query().then((user_data) =>{
    expect(user_data.repositories.nodes.length).toBe(0)});
});