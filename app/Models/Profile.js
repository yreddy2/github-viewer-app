// API key is stored in a different file
const key = require('../Key')
API_KEY = key.API_KEY

// Class that takes in a user and finds the profile data for that user
class Profile {

    constructor(_user) {
        this.user = _user
    }

    query() {
      return fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + API_KEY },
        body: JSON.stringify({ query: 'query { user(login: "'+ this.user +'") { avatarUrl bio createdAt email websiteUrl login name repositories { totalCount } followers { totalCount } following { totalCount }} }' })
      }).then((response) => {
          if(response.ok) {
            return response.json();
          } else {
            throw new Error('Bad Response');
          }
      }).then((json) => {
        const user_data = json.data.user;
        return user_data;
      }).catch(function(error) {
        throw error;
      });
    }
}

exports.Profile = Profile;