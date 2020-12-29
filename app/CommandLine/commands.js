#!/usr/bin/env node
// File that contains the commands for the CLI interface
const program = require('commander');

global.fetch = require("node-fetch");

const {
    getProfile,
    getRepository,
    getFollowers,
    getFollowing
} = require('./index');

program
    .version('1.0.0')
    .description('Get Github Data')

// Command to get the profile
program
    .command('profile <login>')
    .alias('p')
    .description('Get the Profile')
    .action((login) => {
        getProfile(login);
    });

// Command to get the repository
program
    .command('repositories <login>')
    .alias('r')
    .description('Get the Repositories')
    .action((login) => {
        getRepository(login);
    });

// Command to get the followers
program
    .command('followers <login>')
    .alias('fs')
    .description('Get the Followers')
    .action((login) => {
        getFollowers(login);
    });

// Command to get the following
program
    .command('following <login>')
    .alias('fs')
    .description('Get the Following')
    .action((login) => {
        getFollowing(login);
    });

program.parse(process.argv)