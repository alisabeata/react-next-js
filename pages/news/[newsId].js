// domain.com/news/page-name

import { useRouter } from 'next/router'

// dynamic route
function DetailPage() {
  const router = useRouter()

  // get the specific value of the url (/page-name)
  const newsId = router.query.newsId

  return <h1>Detail Page: {newsId}</h1>
}

export default DetailPage
