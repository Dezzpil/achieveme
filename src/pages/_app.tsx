import 'bootstrap/dist/css/bootstrap.css';

import { useEffect } from 'react';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      require('bootstrap/dist/js/bootstrap');
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;