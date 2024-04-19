// domain.com/ - root page

import Head from 'next/head' // for adding metatags etc
import { Fragment } from 'react'
import { MongoClient } from 'mongodb'
import MeetupList from '@/components/Meetups/MeetupList'

// Main features of Next.js
// 1. SSR - Server Side Rendering
// 2. File-based Routing
// 3. Fullstack Capabilities (storing, caching data, authentication etc)

// approach with useEffect doest show the data in the sourse code
// the data should be pre-rendered for the SEO needs
// using two methods:
// 1. Static Generation - SSG (after each update the build should be done again)
//    works with assigning getStaticProps() function
//    (!) it should be only inside of the pages directory
// 2. Server Side Rendering - SSR
//

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta name="description" content="Content description here" />
        {/* add other meta info... */}
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

// (!) getStaticProps and getServerSideProps content doesn't go to the client bundle

// Static Generation
export async function getStaticProps(context) {
  //const params = context.params
  const url = `mongodb+srv://${process.env.APP_DB_LOGIN}:${process.env.APP_DB_PASSOWORD}@cluster0.zhpfitn.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0`

  // connect to mongoDB
  const client = await MongoClient.connect(url)
  const db = client.db()

  // get collection
  const meetupsCollection = db.collection('meetups')

  // get the meetups data
  const meetups = await meetupsCollection.find().toArray()

  // close connection
  client.close()

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      })),
    },
    // prevent data outdating
    // call revalidation of the data each 10s on the server
    revalidate: 10,
  }
}

// Server Side Rendering
// getServerSideProps is running on the server after deployment
// works slower than getStaticProps (you shold wait the rerender after each request)
// use only for frequently changing data
/*
export async function getServerSideProps(context) {
  // analog of middlwares in Node.js
  const req = context.req
  const res = context.res

  // fetch data from an API

  return {
    props: {
      meetups: MOCK_MEETUPS,
    },
  }
}
*/

export default HomePage
