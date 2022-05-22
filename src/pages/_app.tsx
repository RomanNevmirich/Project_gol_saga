import React from 'react';
import '../index.css';
import {Provider} from 'react-redux';
import { store } from '../store';

import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';

/*
export default function App({Component, pageProps}) {
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  );
}
*/

const App = () => {
  return (
    <>
      <Head>
        <title>NextJS App From Scratch</title>
      </Head>
      <div>sometext</div>
    </>
  );
};

export default App;