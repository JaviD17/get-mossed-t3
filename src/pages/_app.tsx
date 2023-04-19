import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Changa } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const changa = Changa({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <main className={changa.className}>
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
