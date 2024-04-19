// domain.com/new-meetup

import NewMeetupForm from '@/components/Meetups/NewMeetupForm'

function NewMeetupPage() {
  const addMeetupHandler = (enteredData) => {
    console.log(enteredData)
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetupPage
