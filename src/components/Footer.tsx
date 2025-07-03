import type { FC } from 'react';
import { Container } from './Container.module.css';
import { MainLink, MainNextLink } from './MainLink';
import classNames from 'classnames';
import { containerFlex, footerWrapper } from './Footer.module.css';

const Footer: FC = () => (
  <footer className={footerWrapper}>
    <div className={classNames(Container, containerFlex)}>
      <p>
        <MainNextLink href="/about/">About</MainNextLink>
      </p>
      <p>
        Made with ❤️ by{' '}
        <MainLink href="https://madelinemiller.dev/">Maddy</MainLink>
      </p>
    </div>
  </footer>
);

export default Footer;
