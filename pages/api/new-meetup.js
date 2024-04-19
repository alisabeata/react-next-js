// /api/new-meetup
// POST /api/new-meetup

import { MongoClient } from 'mongodb'

const url = `mongodb+srv://${process.env.APP_DB_LOGIN}:${process.env.APP_DB_PASSOWORD}@cluster0.zhpfitn.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0`

// the content of the api folder contains server logic
// will be triggered only if the new-meetup is open

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    // const { title, address, description } = data

    // connect to mongoDB
    const client = await MongoClient.connect(url)
    const db = client.db()

    // add collection
    const meetupsCollection = db.collection('meetups')

    // get the result after insertion
    const result = await meetupsCollection.insertOne(data)

    console.log(result)

    // close connection
    client.close()

    // return the result status
    res.status(201).json({ message: 'Meetup inserted' })
  }
}

export default handler
