import { AppProps, NextWebVitalsMetric } from "next/app";
import type { NextPage, NextPageContext } from "next";
import React, { useState, useEffect, createContext } from "react";
import { useRouter, NextRouter } from "next/router";
import Header from "../components/Header";
import { auth } from "../firebase";
import { User } from "../types/my-module";

export const AuthContext = createContext({} as {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
});

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const router = useRouter();
  console.log(router)

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
