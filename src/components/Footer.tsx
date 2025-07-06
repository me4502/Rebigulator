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
      <iframe
        src="https://github.com/sponsors/me4502/button"
        title="Sponsor me4502"
        height="32"
        width="114"
        style={{ border: 0, borderRadius: 6 }}
      ></iframe>
      <p>
        Made with ❤️ by{' '}
        <MainLink href="https://madelinemiller.dev/">Maddy</MainLink>
      </p>
    </div>
  </footer>
);

export default Footer;
