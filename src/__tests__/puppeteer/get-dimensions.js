const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ 
        headless: false,
        slowMo: 250, // slow down by 250ms
        devtools: true,
     });
    const page = await browser.newPage();
    await page.goto('https://agaboodforce.web.app/');
    
    // Save LOGS
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
        console.log(`url is ${location.href}`);
        
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });

    const deb = await page.evaluate(() => { debugger; });

    debugger;
    await page.click('a[target=_blank]');

    console.log('Dimensions:', dimensions);
    console.log('Debugger:', deb);

    await browser.close();
})();