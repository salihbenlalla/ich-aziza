import { AppProps } from 'next/app';
import '../styles/globals.css';

import { Provider } from 'react-redux';
import { store } from '../redux';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;
