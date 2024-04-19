// domain.com/any-name-of-meetup

import Head from 'next/head'
import { MongoClient, ObjectId } from 'mongodb'

function MeetupDetails({ meetupData }) {
  return (
    <div>
      <Head>
        <title>Meetup | {meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <h1>{meetupData.title}</h1>
      <address>{meetupData.address}</address>
      <p>{meetupData.description}</p>
    </div>
  )
}

// it's necessary to load getStaticPaths while using
// getStaticProps in the DYNAMIC route
/*
export async function getStaticPaths() {
  // here should be the list with all possible dynamic routes
  // to pre-generate it
  return {
    paths: [{ params: { meetupId: 'm1' } }],
    fallback: false, // will show 404 it the route was pre-generated
    // with true will rty the regenerate the route
  }
}
*/
const url = `mongodb+srv://${process.env.APP_DB_LOGIN}:${process.env.APP_DB_PASSOWORD}@cluster0.zhpfitn.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0`

export async function getStaticPaths() {
  // connect to MongoDB
  const client = await MongoClient.connect(url)
  const db = client.db()

  // get collection
  const meetupsCollection = db.collection('meetups')

  // get the meetups data
  // {}, { _id: 1 } all elements, but filter by only one field _id
  const meetups = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray()

  // ensure to close the MongoDB connection
  await client.close()

  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId

  // connect to MongoDB
  const client = await MongoClient.connect(url)
  const db = client.db()

  // get collection
  const meetupsCollection = db.collection('meetups')

  // get an element
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  })

  // close connection
  await client.close()

  return {
    props: {
      meetupData: selectedMeetup
        ? {
            id: selectedMeetup._id.toString(), // Convert ObjectId back to string for client-side rendering
            title: selectedMeetup.title,
            address: selectedMeetup.address,
            description: selectedMeetup.description,
          }
        : null,
    },
  }
}

export default MeetupDetails
