// domain.com/ - root page

import { useEffect, useState } from 'react'
import MeetupList from '@/components/Meetups/MeetupList'

// Main features of Next.js
// 1. SSR - Server Side Rendering
// 2. File-based Routing
// 3. Fullstack Capabilities (storing, caching data, authentication etc)

const MOCK_MEETUPS = [
  {
    id: 'm1',
    title: 'Tech Innovators Gathering',
    address: '123 Tech Lane, Innovation City',
    description:
      'Join us to explore the latest in technology and network with industry leaders.',
  },
  {
    id: 'm2',
    title: 'Health and Wellness Expo',
    address: '456 Wellness Blvd, Healthtown',
    description: 'Discover new health trends and meet wellness experts.',
  },
  {
    id: 'm3',
    title: 'Eco Warriors Conference',
    address: '789 Green Path, EcoVille',
    description:
      'A conference for those passionate about environmental conservation.',
  },
  {
    id: 'm4',
    title: 'Artists Retreat',
    address: '321 Creative Ave, Artstown',
    description: 'A retreat for artists to collaborate and inspire each other.',
  },
  {
    id: 'm5',
    title: 'Culinary Delights Workshop',
    address: '654 Flavor St, Foodie City',
    description:
      'A hands-on workshop for food enthusiasts to learn new recipes and cooking techniques.',
  },
  {
    id: 'm6',
    title: 'Entrepreneurs Networking Event',
    address: '987 Startup Road, Business Bay',
    description:
      'An event for startups and entrepreneurs to network and share ideas.',
  },
  {
    id: 'm7',
    title: 'History Buffs Symposium',
    address: '321 Past Lane, Historia',
    description:
      'A gathering for history enthusiasts to discuss historical events and discoveries.',
  },
]

// approach with useEffect doest show the data in the sourse code
// the data should be pre-rendered for the SEO needs
// using two methods:
// 1. Static Generation - SSG (after each update the build should be done again)
//    works with assigning getStaticProps() function
//    (!) it should be only inside of the pages directory
// 2. Server Side Rendering - SSR
//

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />
}

// Static Generation
export async function getStaticProps() {
  // fetch data from an API

  return {
    props: {
      meetups: MOCK_MEETUPS,
    },
    // prevent data outdating
    // call revalidation each 1h on the server
    revalidate: 3600
  }
}

export default HomePage
