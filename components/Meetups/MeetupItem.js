import { useRouter } from 'next/router'
import Card from '../Utils/Card'
import classes from './MeetupItem.module.css'

// useRouter is a program way to navigate application
// router.push() is a program analog of the Link element

function MeetupItem({ title, address, id }) {
  const router = useRouter()

  const showDetailHandler = () => {
    router.push('/' + id)
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  )
}

export default MeetupItem
