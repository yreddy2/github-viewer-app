import 'jest-fetch-mock'
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import userScreen from '../Screens/UserScreen'
import repositoriesScreen from '../Screens/RepositoriesScreen'
import followersScreen from '../Screens/FollowersScreen'
import followingScreen from '../Screens/FollowingScreen'
import renderer from 'react-test-renderer';
import React from 'react';
global.fetch = require('jest-fetch-mock');

beforeEach(() => {
    fetch.resetMocks();
});

it ('User Screen Working Test', () => {
    fetch.mockResponseOnce(JSON.stringify(
        {
            data: {
              user: {
                repositories: {
                  totalCount: 19
                },
                avatarUrl: "https://avatars1.githubusercontent.com/u/35544319?v=4",
                bio: "This is an example bio.",
                createdAt: "2018-01-17T21:27:32Z",
                email: "yreddy2@illinois.edu",
                websiteUrl: "example.com",
                login: "yreddy2",
                name: "Reddy",
                followers: {
                  totalCount: 0
                },
                following: {
                  totalCount: 0
                }
              }
            }
          }
    ));
    const tree = renderer.create(<userScreen />).toJSON();
    expect(tree).toMatchSnapshot();
})

it ('User Screen Error Test', () => {
    fetch.mockResponseOnce(() => Promise.reject("Error Thrown"));
    const tree = renderer.create(<userScreen />).toJSON();
    expect(tree).toMatchSnapshot();
})

it ('User Screen Loading Test', () => {
    fetch.mockResponseOnce(JSON.stringify(
        {
            data: {
              user: {
                repositories: {
                  totalCount: 0
                },
                avatarUrl: "",
                bio: "",
                createdAt: "",
                email: "",
                websiteUrl: "",
                login: "",
                name: "",
                followers: {
                  totalCount: 0
                },
                following: {
                  totalCount: 0
                }
              }
            }
          }
    ));
    const tree = renderer.create(<userScreen />).toJSON();
    expect(tree).toMatchSnapshot();
})

it ('Repositories Screen Working Test', () => {
    fetch.mockResponseOnce(JSON.stringify(
        {
            data: {
              user: {
                repositories: {
                  nodes: [
                    {
                      id: "MDEwOlJlcG9zaXRvcnkxMTk3NDY3MTI=",
                      name: "Lab2",
                      description: "Lab 2 starter code.",
                      owner: {
                        login: "yreddy2"
                      }
                    },
                    {
                      id: "MDEwOlJlcG9zaXRvcnkxMjA2NzkwMjI=",
                      name: "Lab3-Spring-2018",
                      description: "Lab 3 code",
                      owner: {
                        login: "yreddy2"
                      }
                    }
                  ]
                }
              }
            }
          }
    ));
    const tree = renderer.create(<repositoriesScreen />).toJSON();
    expect(tree).toMatchSnapshot();
})

it ('Repositories Screen Error Test', () => {
    fetch.mockResponseOnce(() => Promise.reject("Error Thrown"));
    const tree = renderer.create(<repositoriesScreen />).toJSON();
    expect(tree).toMatchSnapshot();
})

it ('Repositories Screen Loading Test', () => {
    fetch.mockResponseOnce(JSON.stringify(
        {
            data: {
              user: {
                repositories: {
                  nodes: [
                  ]
                }
              }
            }
          }
    ));
    const tree = renderer.create(<repositoriesScreen />).toJSON();
    expect(tree).toMatchSnapshot();
})

it ('Followers Screen Working Test', () => {
  fetch.mockResponseOnce(JSON.stringify(
      {
        data: {
          user: {
            followers: {
              nodes: [
                {
                  avatarUrl: "https://avatars2.githubusercontent.com/u/31696156?u=0e24d52e6ca500ff502a8837d009dc52ccc91973&v=4",
                  name: "Thiago Makluf",
                  login: "tmakluf",
                  id: "MDQ6VXNlcjMxNjk2MTU2"
                }
              ]
            }
          }
        }
      }
  ));
  const tree = renderer.create(<followersScreen />).toJSON();
  expect(tree).toMatchSnapshot();
})

it ('Followers Screen Error Test', () => {
  fetch.mockResponseOnce(() => Promise.reject("Error Thrown"));
  const tree = renderer.create(<followersScreen />).toJSON();
  expect(tree).toMatchSnapshot();
})

it ('Followers Screen Loading Test', () => {
  fetch.mockResponseOnce(JSON.stringify(
    {
      data: {
        user: {
          followers: {
            nodes: [
            ]
          }
        }
      }
    }
  ));
  const tree = renderer.create(<followersScreen />).toJSON();
  expect(tree).toMatchSnapshot();
})

it ('Following Screen Working Test', () => {
  fetch.mockResponseOnce(JSON.stringify(
      {
        data: {
          user: {
            following: {
              nodes: [
                {
                  avatarUrl: "https://avatars2.githubusercontent.com/u/31696156?u=0e24d52e6ca500ff502a8837d009dc52ccc91973&v=4",
                  name: "Thiago Makluf",
                  login: "tmakluf",
                  id: "MDQ6VXNlcjMxNjk2MTU2"
                }
              ]
            }
          }
        }
      }
  ));
  const tree = renderer.create(<followingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
})

it ('Followers Screen Error Test', () => {
  fetch.mockResponseOnce(() => Promise.reject("Error Thrown"));
  const tree = renderer.create(<followingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
})

it ('Followers Screen Loading Test', () => {
  fetch.mockResponseOnce(JSON.stringify(
    {
      data: {
        user: {
          following: {
            nodes: [
            ]
          }
        }
      }
    }
  ));
  const tree = renderer.create(<followingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
})