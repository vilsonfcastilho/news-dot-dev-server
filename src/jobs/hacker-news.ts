import puppeteer from 'puppeteer'

export async function getHackerNews() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  const hackerNewsUrl = 'https://news.ycombinator.com/news'
  await page.goto(hackerNewsUrl, { waitUntil: 'networkidle2' })

  // await page.screenshot({ path: 'hackerNews.png' })

  const data = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('tr.athing')).map((row) => {
      const rank = row.querySelector('.rank')?.textContent?.replace('.', '') || ''
      const titleElement = row.querySelector('.titleline > a')
      const title = titleElement ? titleElement.textContent || '' : ''
      const link = titleElement ? titleElement.getAttribute('href') || '' : ''

      const subtextRow = row.nextElementSibling
      const points = subtextRow?.querySelector('.score')?.textContent || '0 points'
      const author = subtextRow?.querySelector('.hnuser')?.textContent || ''
      const age = subtextRow?.querySelector('.age')?.textContent || ''

      return {
        rank,
        title,
        link,
        points,
        author,
        age,
      }
    })

    return { rows }
  })

  console.log('data ->', data)

  await browser.close()
}
