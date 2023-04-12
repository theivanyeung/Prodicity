// FRONTEND IMPORTS

import { useState } from "react";

import Head from "next/head";
import Router from "next/router";

import { ChakraProvider } from "@chakra-ui/react";

import TopBarProgress from "react-topbar-progress-indicator";

import customTheme from "../styles/customTheme";

import GlobalLayout from "../components/global/layout/Layout";
import GlobalEventLayout from "../components/global/layout/sections/EventBar/Layout";
import SettingsLayout from "../components/settings/layout/Layout";

import { UserContext } from "../utils/context";

// BACKEND IMPORTS

import AuthRouting from "../utils/AuthRouting";
import MobileRouting from "../utils/MobileRouting";
import { useUserData } from "../utils/hooks";

TopBarProgress.config({
  barColors: {
    0: "#FFB55E",
    "1.0": "#E663FB",
  },
  shadowColor: "rgba(0, 0, 0, 0)",
});

const HotJar = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:3362166,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `,
      }}
    />
  );
};

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  // TopBar Progress

  const [progress, setProgress] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setProgress(true);
  });

  Router.events.on("routeChangeComplete", () => {
    setProgress(false);
  });

  if (Component.getLayoutC) {
    return Component.getLayoutC(
      <ChakraProvider resetCss theme={customTheme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <HotJar />
        </Head>

        <Component {...pageProps} />
      </ChakraProvider>
    );
  }

  if (Component.getLayoutEvent) {
    return Component.getLayoutEvent(
      <UserContext.Provider value={userData}>
        {progress && <TopBarProgress />}
        <ChakraProvider resetCss theme={customTheme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="shortcut icon" href="/favicon/favicon.ico" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <HotJar />
          </Head>
          <MobileRouting>
            <AuthRouting>
              <GlobalEventLayout>
                <Component {...pageProps} />
              </GlobalEventLayout>
            </AuthRouting>
          </MobileRouting>
        </ChakraProvider>
      </UserContext.Provider>
    );
  }

  if (Component.getLayoutSettings) {
    return Component.getLayoutSettings(
      <UserContext.Provider value={userData}>
        {progress && <TopBarProgress />}
        <ChakraProvider resetCss theme={customTheme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="shortcut icon" href="/favicon/favicon.ico" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <HotJar />
          </Head>
          <MobileRouting>
            <AuthRouting>
              <GlobalLayout>
                <SettingsLayout>
                  <Component {...pageProps} />
                </SettingsLayout>
              </GlobalLayout>
            </AuthRouting>
          </MobileRouting>
        </ChakraProvider>
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={userData}>
      {progress && <TopBarProgress />}
      <ChakraProvider resetCss theme={customTheme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <HotJar />
        </Head>
        <MobileRouting>
          <AuthRouting>
            <GlobalLayout>
              <Component {...pageProps} />
            </GlobalLayout>
          </AuthRouting>
        </MobileRouting>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default MyApp;

