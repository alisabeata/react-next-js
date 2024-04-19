import '@/styles/globals.css'

import Layout from '@/components/Layout/Layout'

// the root component
// suitable for adding the main layout or other 
// mutual elements of the application

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
