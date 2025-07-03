import type { FC } from 'react';
import { Container } from './Container.module.css';
import Link from 'next/link';
import { nav, headerLink } from './Header.module.css';

const Header: FC = () => (
  <header className={nav}>
    <div className={Container}>
      <nav style={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/" className={headerLink}>
          Rebigulator
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
