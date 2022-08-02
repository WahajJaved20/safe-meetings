import "../styles/globals.css";
import Head from "next/head";
import { MoralisProvider } from "react-moralis";
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Safe Meetings</title>
        <meta name="Safe Meetings Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <Component {...pageProps} />
      </MoralisProvider>
    </div>
  );
}

export default MyApp;
