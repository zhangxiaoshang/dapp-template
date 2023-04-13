import "@/styles/globals.css";
import { ReactNode, ReactElement } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import MainLayout from "@/layouts/main-layout";
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeComponent } from "@/themes/theme-component";
import { SettingsProvider, SettingsConsumer } from "@/context/settings-context";
import { Web3Modal } from "@web3modal/react";
import { useNProgress } from "@/hooks/use-nprogress";
import { WagmiConfig } from "wagmi";
import { SnackbarProvider } from "notistack";
import { createWagmiClient, ethereumClient } from "@/wagmi";
import { webModalThemeVariables } from "@/configs/web3-modal-theme-variables";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

// Get projectID at https://cloud.walletconnect.com
if (!projectId) {
  throw new Error(
    "You need to provide NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID env variable"
  );
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useNProgress();

  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <StyledEngineProvider injectFirst>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => (
            <>
              <ThemeComponent settings={{ mode: settings.mode }}>
                <WagmiConfig client={createWagmiClient()}>
                  <SnackbarProvider maxSnack={3}>
                    {getLayout(<Component {...pageProps} />)}
                  </SnackbarProvider>
                </WagmiConfig>
              </ThemeComponent>

              <Web3Modal
                projectId={projectId}
                ethereumClient={ethereumClient}
                themeMode={settings.mode}
                themeVariables={webModalThemeVariables}
              />
            </>
          )}
        </SettingsConsumer>
      </SettingsProvider>
    </StyledEngineProvider>
  );
}
