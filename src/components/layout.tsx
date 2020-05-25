/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';

import Header from './Header';
import './normalize.css';
import './layout.css';
import { Helmet } from 'react-helmet';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Lato&display=block"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
