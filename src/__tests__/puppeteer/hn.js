const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com', { waitUntil: 'networkidle2' });
    await page.pdf({ path: 'hn.pdf', format: 'LETTER' });

    await browser.close();
})();