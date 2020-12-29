# React Native GitHub Viewer

This React Native App allows a user to view their GitHub profile as well as their public repositories.

## API
The GraphQL API from GitHub is used to gather data about the users. The API can be specified to only the information the user needs to it is very versitile. It is used to get both the user info and the repo info.

## Warnings

- Please see the list of dependencies to make sure that you can run the application well. There are many imports needed. If you are missing a dependency, simply use npm install to get the package.

- You will also need a GitHub Token to access the API. This can generated in the developer settings of your GitHub profile.

- Expo was used create the app since it packages and runs both ios and android versions of the app easily.

## Command Line Interface

I have also implemented a Command Line Interface for the App with allows the a user to browse the GitHub API in a terminal. I used Node.js to create the app. It can be found in the CommandLine folder.

## Next Step

A search functionality can also be added to extend the ability to browse users on the site.
