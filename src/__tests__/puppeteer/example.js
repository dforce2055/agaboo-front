const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set Size of the screen
    await page.setViewport({
        width:1280,
        height: 720,
        deviceScaleFactor: 1,
    })

    await page.goto('https://www.telpin.com.ar');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
})();