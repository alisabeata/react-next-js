// domain.com/new-meetup

import Head from 'next/head'
import { Fragment } from 'react'
import NewMeetupForm from '@/components/Meetups/NewMeetupForm'
import { useRouter } from 'next/router'

function NewMeetupPage() {
  const router = useRouter()

  const addMeetupHandler = async (enteredData) => {
    // create the request for the bild-in api
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    console.log(data)

    router.push('/')
  }

  return (
    <Fragment>
      <Head>
        <title>Add a meetup</title>
        <meta name="description" content="Content description here" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  )
}

export default NewMeetupPage
