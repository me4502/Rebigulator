import Router from 'next/router';
import '../src/components/layout.css';
import '../src/components/normalize.css';

import * as gtag from '../src/components/gtag';

Router.events.on('routeChangeComplete', (url: string) => gtag.pageview(url));

export { default } from 'next/app';
