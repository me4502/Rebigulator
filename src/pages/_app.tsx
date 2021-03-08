import App from 'next/app';
import Router from 'next/router';
import '../components/layout.css';
import '../components/normalize.css';

import * as gtag from '../components/gtag';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

export default App;
