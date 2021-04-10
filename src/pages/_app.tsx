import React from 'react';
import { AppProps } from 'next/app';
import { Provider as AuthProvider } from 'next-auth/client';
import '../styles/main.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { session } = pageProps
  
  return (
    <AuthProvider session={session}>
      <Component {...pageProps} />)
    </AuthProvider>
  )
}

export default MyApp