import puppeteer from 'puppeteer'

export async function getRedditPosts() {
  const browser = await puppeteer.launch({ headless: 'shell' })
  const page = await browser.newPage()

  const redditUrl = 'https://www.reddit.com'
  await page.goto(redditUrl + '/r/AskProgramming/', { waitUntil: 'networkidle2' })

  // await page.screenshot({ path: 'redditUrl.png' })

  const data = await page.evaluate(() => {
    const posts = Array.from(document.querySelectorAll('shreddit-post')).map((post) => {
      const title = post.getAttribute('post-title')
      const link = redditUrl + post.getAttribute('permalink')
      const comments = post.getAttribute('comment-count')

      return {
        title,
        link,
        comments,
      }
    })

    return { posts }
  })

  console.log('data ->', data)

  await browser.close()
}
