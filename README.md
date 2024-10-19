
# Reddit Web Scraper using Puppeteer

This project is a web scraper built using [Puppeteer](https://github.com/puppeteer/puppeteer) to extract Reddit posts, comments, and related data based on a search query. The scraped data is saved in a `data.json` file for further analysis or use.

## Features

- Scrapes Reddit posts based on a search query.
- Scrolls through the search results to load more posts dynamically.
- Extracts post titles, body content, comments, author, and score.
- Saves scraped data in JSON format for easy access.
  
## Prerequisites

Before running this project, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/reddit-web-scraper.git
   cd reddit-web-scraper
   ```

2. **Install dependencies**:

   Use npm to install the required dependencies.

   ```bash
   npm install
   ```

## Usage

### Running the Scraper

To run the scraper, use the following command:

```bash
node index.js
```

By default, the script will scrape Reddit posts based on the `searchQuery` provided in the code. You can modify the search query to suit your needs.

### Modifying the Search Query

In the `index.js` file, you can replace the `searchQuery` with any term you want to scrape posts for. For example:

```javascript
run("Fun Games")  // Change this to any query you want
```

### Example

By default, if you run the project with the query `"Fun Games"`, the scraper will navigate to Reddit’s search results page for that query, scroll through the results, extract data from each post (title, body, comments), and save it to a `data.json` file.

The output in `data.json` will look like this:

```json
[
  {
    "title": "What are some fun games to play with friends?",
    "body": "We are looking for recommendations on fun games...",
    "post": {
      "score": 125,
      "comments": 50,
      "subreddit": "r/gaming",
      "author": "gamer123",
      "link": "https://www.reddit.com/r/gaming/post/123456"
    },
    "comments": [
      {
        "commentBody": "Try playing Among Us!",
        "author": "player1",
        "score": 23,
        "commentLink": "/r/gaming/comment/1234",
        "depth": 0
      },
      {
        "commentBody": "Minecraft is always fun!",
        "author": "blockbuilder",
        "score": 15,
        "commentLink": "/r/gaming/comment/5678",
        "depth": 1
      }
    ]
  }
]
```

### How It Works

1. **Set Up Puppeteer**: The script launches a Chromium browser and opens a new page.
2. **Execute Search Query**: The search query is executed on Reddit, and the scraper navigates to the results page.
3. **Scroll Through Results**: It simulates user scrolling to load more results dynamically.
4. **Extract Data**: Using CSS selectors, the scraper pulls data such as post titles, body content, author, and comments.
5. **Save Data**: All extracted data is saved in JSON format.

## Advanced Usage

- **Headless Mode**: The scraper is set to run in a non-headless mode (`headless: false`) so you can see it working. To run it in the background without opening a browser window, change this setting to `true` in `index.js`:

  ```javascript
  const browser = await puppeteer.launch({ headless: true });
  ```

- **Adjust Scrolling**: You can adjust how many times the script scrolls to load more results by modifying the `scrollTimes` function in the code:

  ```javascript
  await scrollTimes(100); // Change the number for more or fewer scrolls
  ```

## Saving Data

The scraped data is saved in a `data.json` file in the project directory. You can open this file to see all the posts and comments that were scraped.

## Troubleshooting

- **Empty Data File**: If the `data.json` file is empty, make sure that the CSS selectors in the code are up-to-date. Reddit’s layout might change, so you may need to update the selectors.
- **Infinite Scrolling Issues**: If the script fails to scroll enough times, increase the number in the `scrollTimes` function.
- **Headless Mode Not Working**: Some websites behave differently in headless mode. If you encounter issues, try running the scraper with `headless: false`.

## Contributing

Feel free to fork this project and submit pull requests if you'd like to contribute! You can also open issues for bugs or suggestions.
