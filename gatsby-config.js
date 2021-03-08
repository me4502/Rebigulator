module.exports = {
  plugins: [
    `gatsby-plugin-sitemap`,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
