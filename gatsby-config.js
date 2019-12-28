const proxy = require('http-proxy-middleware');

module.exports = {
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    );
  },
  siteMetadata: {
    title: `Rebigulator`,
    description: `A Frinkiac-Powered Simpsons trivia game.`,
    author: `@the_me4502`,
    siteUrl: 'https://rebigulator.org',
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['UA-39440889-5'],
        // Puts tracking script in the head instead of the body
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://rebigulator.org`,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      policy: [{ userAgent: '*', allow: '/', disallow: '/cdn-cgi/' }],
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
