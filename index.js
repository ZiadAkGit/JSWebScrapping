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
    await page.waitForXPath('//*[@id="search"]/div[1]/div[2]/div/span[3]/div[2]/div[24]/span/div/div/ul/li[3]/a');
    const [prices] = await page.$x('//*[@id="search"]/div[1]/div[2]/div/span[3]/div[2]/div[24]/span/div/div/ul/li[3]/a');
    await page.click('#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(24) > span > div > div > ul > li:nth-child(3) > a');
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