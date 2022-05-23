import React from 'react';
import '../index.css';
import Head from 'next/head';
import Header from '../components/Header/Header';

const App = () => {
  return (
    <>
      <Head>
        <title>NextJS App From Scratch</title>
      </Head>
      <Header />
    </>
  );
};

export default App;