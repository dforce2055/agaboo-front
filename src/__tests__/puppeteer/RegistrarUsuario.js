'use strict';
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const email = 'agabooteam@gmail.com';
const password = 'lsfalv666';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 5, // slow down by 250ms
        devtools: false,
    });

    const page = await browser.newPage();
    await page.emulate(iPhone);

    await page.goto('http://localhost:3000/login');
    await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.js' });


    let selector = '.SignIn-main-1 > .MuiPaper-root > .SignIn-form-4 > .MuiButtonBase-root > .MuiButton-label';
    await page.waitForSelector(selector);
    await page.click(selector);

    // esperamos por la segunda pagina que se abre para iniciar sesión
    await page.waitFor(6000);
    let pages = await browser.pages();

    const fPage = pages[1];
    const sPage = pages[2];

    // correo electrónico
    selector = '.rFrNMe #identifierId';
    await sPage.waitForSelector(selector);
    await sPage.type(selector, email + '\r');

    // password
    await page.waitFor(2000);
    selector = '#password  input';
    await sPage.waitForSelector(selector);
    await sPage.type(selector, password + '\r');



    await page.waitFor(10000);
    await page.goto('http://localhost:3000/registrar-usuario');

    selector = '#nombre';
    await page.waitForSelector(selector);
    await page.type(selector, "Titiritero" + '\r');

    selector = '#apellido';
    await page.waitForSelector(selector);
    await page.type(selector, "Puppeteer" + '\r');

    selector = '#numeroDocumento';
    await page.waitForSelector(selector);
    await page.type(selector, "20333444" + '\r');

    //Tipo de Usuario
    selector = '#outlined-select-roles';
    await page.waitForSelector(selector);
    await page.click(selector);

    // Opcion Tipo de Usuario
    await page.waitFor(1000);
    selector = '#menu- > div.MuiPaper-root-588.MuiMenu-paper-430.MuiPaper-elevation8-598.MuiPopover-paper-433.MuiPaper-rounded-589 > ul > li:nth-child(1)';
    await page.waitForSelector(selector);
    await page.click(selector);

    // email
    selector = '#root > div > main > div > form > div > div:nth-child(7) > div > div > input';
    await page.waitForSelector(selector);
    await page.type(selector, "_thepuppeteer@gmail.com" + '\r');

    // localidad
    selector = '#root > div > main > div > form > div > div:nth-child(8) > div > div > input';
    await page.waitForSelector(selector);
    await page.type(selector, "the puppeteer city" + '\r');

    // calle
    selector = '#root > div > main > div > form > div > div:nth-child(9) > div > div > input';
    await page.waitForSelector(selector);
    await page.type(selector, "the puppe street" + '\r');

    // Altura
    selector = '#root > div > main > div > form > div > div:nth-child(10) > div > div > input';
    await page.waitForSelector(selector);
    await page.type(selector, "9600" + '\r');

    // Celular
    selector = '#root > div > main > div > form > div > div:nth-child(11) > div > div > input';
    await page.waitForSelector(selector);
    await page.type(selector, "+54 9 2254 9600" + '\r');

    // Guardar
    await page.waitFor(3000);
    selector = 'body > div.MuiDialog-root-524.MuiButtonGroup-grouped-485.MuiButtonGroup-groupedText-486.MuiButtonGroup-groupedText-486 > div.MuiDialog-container-527.MuiDialog-scrollPaper-525 > div > div.MuiDialogActions-root-667.MuiDialogActions-spacing-668 > button > span.MuiButton-label-497';
    await page.waitForSelector(selector);
    await page.click(selector);



    await page.waitFor(10000);
    console.log("######################################");
    console.log("#   Guardando captura de pantalla    #");
    console.log("######################################");

    let timestamp = new Date();

    await page.screenshot({
        path: 'llegue-a-registrar-usuario-' + timestamp.getFullYear() + '-' + timestamp.getMonth() + '-' + timestamp.getDay() + '-' + timestamp.getMilliseconds() + '.png', fullPage: true
    });

    await page.waitFor(4000);
    await browser.close();
})();
/*(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 5, // slow down by 250ms
        devtools: false,
    });
    
    const page = await browser.newPage();
    await page.emulate(iPhone);

    await page.goto('http://localhost:3000/login');
    await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.js' });

    
    let selector = '.SignIn-main-1 > .MuiPaper-root > .SignIn-form-4 > .MuiButtonBase-root > .MuiButton-label';
    await page.waitForSelector(selector);
    await page.click(selector);

    // esperamos por la segunda pagina que se abre para iniciar sesión
    await page.waitFor(6000);
    let pages = await browser.pages();
    
    const fPage = pages[1];
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
    


    await page.waitFor(10000);
    await page.goto('http://localhost:3000/registrar-usuario');

    selector = '#nombre';
    await page.waitForSelector(selector);
    await page.type(selector, "Titiritero" + '\r');

    selector = '#apellido';
    await page.waitForSelector(selector);
    await page.type(selector, "Puppeteer" + '\r');

    selector = '#numeroDocumento';
    await page.waitForSelector(selector);
    await page.type(selector, "20333444" + '\r');

    //Tipo de Usuario
    selector = '.MuiGrid-root-247 > .MuiGrid-root-247:nth-child(5) > .MuiFormControl-root-351 > .MuiInputBase-root-389 > .MuiSelect-root-411';
    await page.waitForSelector(selector);
    await page.click(selector);

    // Opcion Tipo de Usuario
    //'body > #menu- > .MuiPaper-root-679 > .MuiList-root-706 > .MuiButtonBase-root-478:nth-child(2)'
    selector = '#menu- > div.MuiPaper-root-587.MuiMenu-paper-429.MuiPaper-elevation8-597.MuiPopover-paper-432.MuiPaper-rounded-588 > ul > li:nth-child(1)';
    await page.waitForSelector(selector);
    await page.click(selector);

    // email
    selector = '#root > div > main > div > form > div > div:nth-child(7) > div > div > input';
    await page.waitForSelector(selector);
    await page.type(selector, "_thepuppeteer@gmail.com" + '\r');

    // localidad
    selector = '#root > div > main > div > form > div > div:nth-child(8) > div > div > input';
    await page.waitForSelector(selector);
    await page.type(selector, "the puppeteer city" + '\r');
    
    // calle
    selector = '#root > div > main > div > form > div > div:nth-child(9) > div > div > input';
    await page.waitForSelector(selector);
    await page.type(selector, "the puppe street" + '\r');
    
    // Altura
    selector = '#root > div > main > div > form > div > div:nth-child(10) > div > div > input';
    await page.waitForSelector(selector);
    await page.type(selector, "9600" + '\r');
    
    // Celular
    selector = '#root > div > main > div > form > div > div:nth-child(11) > div > div > input';
    await page.waitForSelector(selector);
    await page.type(selector, "+54 9 2254 9600" + '\r');
    
    // Guardar
    selector = '#root > div > main > div > form > div > div.MuiGrid-root-247.MuiGrid-container-248.MuiGrid-spacing-xs-2-271.MuiGrid-item-249.MuiGrid-justify-xs-center-265.MuiGrid-grid-xs-12-293.MuiGrid-grid-sm-6-301 > div > button.MuiButtonBase-root-478.MuiButton-root-495.MuiButton-contained-503.MuiButtonGroup-grouped-484.MuiButtonGroup-groupedText-485.MuiButtonGroup-groupedText-485.MuiButton-containedPrimary-504.MuiButton-containedSizeLarge-514.MuiButton-sizeLarge-516 > span.MuiButton-label-496';
    await page.waitForSelector(selector);
    await page.click(selector);



    await page.waitFor(10000);
    console.log("######################################");
    console.log("#   Guardando captura de pantalla    #");
    console.log("######################################");

    let timestamp = new Date();

    await page.screenshot({
        path: 'llegue-a-registrar-usuario-' + timestamp.getFullYear() + '-' + timestamp.getMonth() + '-' + timestamp.getDay() + '-' + timestamp.getMilliseconds() + '.png', fullPage: true
    });

    await page.waitFor(4000);
    await browser.close();
})();
*/
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



