'use strict';
const devices = require('puppeteer/DeviceDescriptors');
const puppeteer = require('puppeteer');
const email = 'agabooteam@gmail.com';
const password = 'lsfalv666';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 5, // slow down by 250ms
        devtools: false,
    });
    const page = await browser.newPage();


    await page.goto('http://localhost:3000/login');
    await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.js' });
    
    let selector = '.SignIn-main-1 > .MuiPaper-root > .SignIn-form-4 > .MuiButtonBase-root > .MuiButton-label';
    await page.waitForSelector(selector);
    await page.click(selector);

    // esperamos por la segunda pagina que se abre para iniciar sesión
    await page.waitFor(6000);
    let pages = await browser.pages();
    
    const sPage = pages[2];

    // correo electrónico
    selector = '.rFrNMe #identifierId';
    await sPage.waitForSelector(selector);
    await sPage.type(selector, email +'\r');

    // password
    await page.waitFor(2000);
    selector = '#password  input';
    await sPage.waitForSelector(selector);
    await sPage.type(selector, password + '\r');
    
    
/*
    // último paso
    await page.waitFor(10000);
    selector = '#root > main > div > form > button > span.MuiButton-label';
    await page.waitForSelector(selector);
    await page.click(selector);
    await page.waitFor(1000);
*/  
    await page.waitFor(10000);
    console.log("######################################");
    console.log("#   Guardando captura de pantalla    #");
    console.log("######################################");

    let timestamp = new Date();

    await page.screenshot({
        path: 'llegue-a-iniciar-sesion-' + timestamp.getFullYear() + '-' + timestamp.getMonth() + '-' + timestamp.getDay() + '-' + timestamp.getMilliseconds() + '.png', fullPage: true
    });

    await page.waitFor(4000);
    await browser.close();
})();

async function getSelectorByHisContent(page, container, textContent) {
    /**
     * Función para buscar un selector dependiendo del texto que contiene
     * page Puppeteer
     * container Es el contenedor puede ser div, p, li, body, etc.
     * textContent es el texto a buscar
     * 
     * Método sin función
     * selector = await page.$x('//p[contains(text(), "Comprobantes en línea")]');
     * selector[0].click();
     */
    try {
        let selector = await page.$x(`//${container}[contains(text(), "${textContent}")]`);
        selector[0].click();
    } catch (error) {
        console.log("Error => " + error);
    }

}

/**
 * JQUERY SELECTOR
 * await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.js' });
 * const boton = await page.evaluate(() => {
            const $ = window.$; //otherwise the transpiler will rename it and won't work
            return $('p:contains("Comprobantes en línea")');
        });
 *
 *
 */