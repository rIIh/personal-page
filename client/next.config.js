const withSass = require('@zeit/next-sass');
require('dotenv').config({ path: require('find-config')('.env') });

module.exports = {
    target: 'server',
    distDir: 'dist',
    publicRuntimeConfig: {
        GA_ID: process.env.GA_ID,
    },
    ...withSass(),
};
