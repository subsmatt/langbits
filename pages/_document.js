import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="/style/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/style/fontawesome/css/all.min.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="/style/js/bootstrap.bundle.min.js"></script>
      </body>
    </Html>
  );
}