// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', "G-07LL5CXK2E", {
    page_path: url,
  })
}