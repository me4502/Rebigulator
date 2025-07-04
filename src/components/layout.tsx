/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import type { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { LIGHT_THEME, DARK_THEME } from '../util/color';
import { siteWrapper } from './layout.module.css';

const COLOR_THEME_STYLES = `
html {
  --theme-background: ${LIGHT_THEME.background};
  --theme-primary: ${LIGHT_THEME.primary};
  --theme-secondary: ${LIGHT_THEME.secondary};
  --theme-tertiary: ${LIGHT_THEME.tertiary};
  --theme-text: ${LIGHT_THEME.text};
  --theme-box-blue: ${LIGHT_THEME.boxes.blue};
  --theme-box-orange: ${LIGHT_THEME.boxes.orange};
  --theme-box-green: ${LIGHT_THEME.boxes.green};
  --theme-box-purple: ${LIGHT_THEME.boxes.purple};
  --theme-box-blue-hover: ${LIGHT_THEME.boxes.blueHover};
  --theme-box-orange-hover: ${LIGHT_THEME.boxes.orangeHover};
  --theme-box-green-hover: ${LIGHT_THEME.boxes.greenHover};
  --theme-box-purple-hover: ${LIGHT_THEME.boxes.purpleHover};
}

@media (prefers-color-scheme: dark) {
  html {
    --theme-background: ${DARK_THEME.background};
    --theme-primary: ${DARK_THEME.primary};
    --theme-secondary: ${DARK_THEME.secondary};
    --theme-tertiary: ${DARK_THEME.tertiary};
    --theme-text: ${DARK_THEME.text};
    --theme-box-blue: ${DARK_THEME.boxes.blue};
    --theme-box-orange: ${DARK_THEME.boxes.orange};
    --theme-box-green: ${DARK_THEME.boxes.green};
    --theme-box-purple: ${DARK_THEME.boxes.purple};
    --theme-box-blue-hover: ${DARK_THEME.boxes.blueHover};
    --theme-box-orange-hover: ${DARK_THEME.boxes.orangeHover};
    --theme-box-green-hover: ${DARK_THEME.boxes.greenHover};
    --theme-box-purple-hover: ${DARK_THEME.boxes.purpleHover};
  }
}
`.replaceAll(/[\n\r ]/g, '');

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <>
      <Head>
        <style>{COLOR_THEME_STYLES}</style>
      </Head>
      <div className={siteWrapper}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
