const puppeteer = require('puppeteer');

async function getWeatherFromCity(city){
    const browser = await puppeteer.launch({ headless: false });
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

async function getAmazonProducts(product,pages){
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/');
    await page.waitForXPath('//*[@id="twotabsearchtextbox"]')
    await page.type('input[id=twotabsearchtextbox]',product+'\n');
    console [prices] = await page.$x('//*[@id="search"]/div[1]/div[2]/div/span[3]/div[2]/div/div/span/div/div/div[2]/div[2]/div/div[2]/div[1]/div/div[1]/div/div/div/a/span');
    console.log(prices);
    // await page.waitForXPath('//*[@id="wob_wc"]');
    // const [degree] = await page.$x('//*[@id="wob_tm"]');
    // const valueof = await degree.getProperty('textContent');
    // const textV = await valueof.jsonValue();
    // console.log('The Weather in ' + city + ' is: '+String(textV).trim()+'°C');
    // browser.close();
}

//  //*[@id="search"]/div[1]/div[2]/div/span[3]/div[2]/div[2]/div/span/div/div/div[2]/div[2]/div/div[2]/div[1]/div/div[1]/div/div/div/a/span
// //*[@id="search"]/div[1]/div[2]/div/span[3]/div[2]/div[10]/div/span/div/div/div[2]/div[2]/div/div[2]/div[1]/div/div[1]/div/div/div/a/span

//getWeatherFromCity('Haifa');
getAmazonProducts('iphone',2);