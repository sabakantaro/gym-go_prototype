import { AppProps } from "next/app";
import ProgressBar from "@badrap/bar-of-progress";
import type { NextPage } from "next";
import React, { useState, useEffect, createContext } from "react";
import Router from "next/router";
import Header from "../components/Header";
import { auth } from "../firebase";
import { User } from "../types/my-module";
import "mapbox-gl/dist/mapbox-gl.css"

export const AuthContext = createContext({} as {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
});

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser: any) => {
      setCurrentUser(currentUser);
      setIsSignedIn(true);
      console.log(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}
    >
      <Header />
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

const progress = new ProgressBar({
  size: 4,
  color: '#FE595E',
  className: 'z-50',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

MyApp.getInitialProps = async ({
  Component,
  ctx,
}: any): Promise<AppProps> => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  // @ts-ignore
  return { pageProps };
};


export default MyApp;
