const puppeteer = require('puppeteer');

async function getWeatherFromCity(city){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    await page.waitForXPath('//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input')
    await page.type('input[name=q]','Weather in '+city+'\n');
    await page.waitForXPath('//*[@id="wob_wc"]');
    const [degree] = await page.$x('//*[@id="wob_tm"]');
    const valueof = await degree.getProperty('textContent');
    const textV = await valueof.jsonValue();
    console.log('The Weather in ' + city + ' is: '+String(textV).trim()+'°C');
    browser.close();
}
getWeatherFromCity('Tel Aviv');