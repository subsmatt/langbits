import { SessionProvider } from "next-auth/react";

function NextJSApp({Component, pageProps: { session, ...pageProps }}){

    return (
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        );
}

export default NextJSApp;