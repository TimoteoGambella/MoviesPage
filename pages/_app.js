import '../styles/Styles.scss'
import Head from 'next/head'
import { Movies } from '../Context/MoviesContext'
import { Genres } from '../Context/GenresContext'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import * as gtag from "../Functions/gtag"
function MyApp({ Component, pageProps }) {

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Head>
        <title>Movies Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta charSet="utf-8"/>
        <meta name="description" content="Sitio web de Rosé Aromas, emprendimiento de Zárate. Dedicado a la venta de velas, homesprays, difusores y bombones aromatizados."/>
	      <meta name="keywords" content="aromas, vela, difusor, bombon, homespray, perfume, decoracion, emprendimiento, rose"/>
        <meta name="theme-color" content="#084444"/>
      </Head>

      <Movies>
        <Genres>
            {/* Google Analytics */}
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=G-07LL5CXK2E`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-07LL5CXK2E', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />

          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossOrigin="anonymous"/>

          <Component {...pageProps} />
        </Genres>
      </Movies>

    </>
  )
}

export default MyApp
