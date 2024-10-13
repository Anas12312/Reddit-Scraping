const puppeteer = require('puppeteer')
const fs = require('fs')

async function run(searchQuery) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    })

    const searchQueryUrl = searchQuery.replace(' ', '+')

    const page = await browser.newPage()
    await page.goto('https://www.reddit.com/search/?q=' + searchQueryUrl, {
        waitUntil: "domcontentloaded"
    })

    const scrollTimes = async (times) => {
        for (let i = 0; i < times; i++) {
            await page.evaluate(async () => {
                const distance = window.innerHeight; // Scroll by the viewport height
                window.scrollBy(0, distance);
            });

            await new Promise(resolve => setTimeout(resolve, 500)); // Wait for content to load
        }
    };

    await scrollTimes(100);

    const links = await page.$$eval('#main-content > div > reddit-feed > faceplate-tracker > post-consume-tracker > div > faceplate-tracker:nth-child(1) > h2 > a', allAnchors => allAnchors.map(anchor => anchor.href))

    console.log(links.length);

    const data = []

    for (let link of links) {
        await page.goto(link, { waitUntil: 'domcontentloaded' })
        try {
            const title = await page.$eval('h1[slot="title"]', (el) => el?.innerText)

            let body
            const bodyEl = await page.$('div.text-neutral-content p')
            if (bodyEl) {
                body = await bodyEl.evaluate((el) => el?.innerText)
                console.log(body);
            }

            const post = await page.$eval('shreddit-post', (el) => {
                return {
                    score: el.score,
                    comments: el.commentCount,
                    subreddit: el.subredditPrefixedName,
                    author: el.getAttribute('author'),
                    link: el.contentHref
                }
            })

            const comments = await page.$$eval('shreddit-comment', (els) => els.map(el => {
                const commentBody = el.querySelector('div[slot="comment"] p')?.innerText

                return {
                    commentBody,
                    author: el.getAttribute('author'),
                    score: el.score,
                    commentLink: el.getAttribute('reload-url'),
                    depth: el.getAttribute('depth')
                }
            }))

            console.log(comments);

            console.log(post);

            data.push({
                title,
                body,
                post,
                comments
            })

        }
        catch (e) {
            console.log(e);
        }
    }


    await browser.close()
    console.log(data)
    const stringifiedData = JSON.stringify(data)
    fs.writeFileSync('data.json', stringifiedData)

}

run("Video Games")