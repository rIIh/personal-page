import { ApolloProvider } from '@apollo/react-hooks';
import App from 'next/app';
import Head from 'next/dist/next-server/lib/head';
import React, { useEffect } from 'react';
import withData from '../lib/withApollo';
import LayoutComponent from './components/layout';

import getConfig from 'next/config';
const { publicRuntimeConfig: { GA_ID } } = getConfig();

class MyApp extends App {
    render() {
      const { Component, pageProps, apollo } = this.props;
      return (
            <ApolloProvider client={apollo}>
                <Head>
                    <title>Todos</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <script src="https://kit.fontawesome.com/289b40fec9.js" crossOrigin="anonymous"/>
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}/>
                </Head>
                <LayoutComponent>
                  <Component {...pageProps} />
                </LayoutComponent>
            </ApolloProvider>
        );
    }
}

// Wraps all components in the tree with the data provider
export default withData(MyApp);
