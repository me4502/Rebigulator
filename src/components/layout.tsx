/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';

import Header from './Header';
import Footer from './Footer';
import { LIGHT_THEME, DARK_THEME } from '../util/color';
import { Helmet } from 'react-helmet';

const COLOR_THEME_STYLES = `
html {
  --theme-background: ${LIGHT_THEME.background};
  --theme-primary: ${LIGHT_THEME.primary};
  --theme-secondary: ${LIGHT_THEME.secondary};
  --theme-tertiary: ${LIGHT_THEME.tertiary};
  --theme-text: ${LIGHT_THEME.text};
}

@media (prefers-color-scheme: dark) {
  html {
    --theme-background: ${DARK_THEME.background};
    --theme-primary: ${DARK_THEME.primary};
    --theme-secondary: ${DARK_THEME.secondary};
    --theme-tertiary: ${DARK_THEME.tertiary};
    --theme-text: ${DARK_THEME.text};
  }
}
`.replace(/[\n\r ]/g, '');

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Helmet>
        <style>{COLOR_THEME_STYLES}</style>
      </Helmet>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
