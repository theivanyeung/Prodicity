/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// CLIENT ENV VARS

const withNextEnv = require("next-env");

module.exports = withNextEnv({});

// NEXT IMAGES

module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  env: {
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  },
};

