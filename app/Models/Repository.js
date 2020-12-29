// API key is stored in a different file
const key = require('../Key')
API_KEY = key.API_KEY

// Class that takes in a user and finds the repository data for that user
class Repository {

    constructor(_user) {
        this.user = _user
    }

    query() {
      return fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + API_KEY },
        body: JSON.stringify({ query: 'query { user(login: "' + this.user + '") { repositories(first: 100) { nodes { id name description owner { login } } } }}' })
      }).then((response) => {
          return response.json();
      }).then((json) => {
        const user_data = json.data.user;
        return user_data;
      }).catch(function(error) {
        throw error;
      });
    }
}

exports.Repository = Repository;