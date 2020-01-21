import { ApolloProvider } from '@apollo/react-hooks';
import App from 'next/app';
import Head from 'next/dist/next-server/lib/head';
import React, { useEffect } from 'react';
import withData from '../lib/withApollo';
import LayoutComponent from './components/layout';
import './styles/styles.scss';

import getConfig from 'next/config';
import DotsBackground from './components/background';
import Timeline from './components/Timeline';
import FloatingPoint from "./components/floatingPoint";
const { publicRuntimeConfig: { GA_ID } } = getConfig();

class MyApp extends App {
    render() {
      const { Component, pageProps, apollo } = this.props;
      return (
            <ApolloProvider client={apollo}>
                <Head>
                    <title>MELV.Space</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <script src="https://kit.fontawesome.com/289b40fec9.js" crossOrigin="anonymous"/>
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}/>
                    <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.1/build/pure-min.css"
                          integrity="sha384-oAOxQR6DkCoMliIh8yFnu25d7Eq/PHS21PClpwjOTeU2jRSq11vu66rf90/cZr47"
                          crossOrigin="anonymous"/>
                    <link rel="stylesheet"
                          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
                          integrity="sha256-+N4/V/SbAFiW1MPBCXnfnP9QSN3+Keu+NlB+0ev/YKQ=" crossOrigin="anonymous"/>
                </Head>
                <LayoutComponent>
                  <DotsBackground/>
                  <Timeline count={4} initialIndex={1}/>
                  <FloatingPoint/>
                  <Component {...pageProps} />
                </LayoutComponent>
            </ApolloProvider>
        );
    }
}

// Wraps all components in the tree with the data provider
export default withData(MyApp);
