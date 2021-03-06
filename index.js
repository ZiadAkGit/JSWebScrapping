const puppeteer = require('puppeteer');
const fsLibrary  = require('fs') 
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
    browser.close();
    console.log('The Weather in ' + city + ' is: '+String(textV).trim()+'°C');
}

async function getDogsName(){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    page.goto('https://dogtime.com/dog-breeds/profiles');
    await page.waitForXPath('/html/body/div[1]/div[2]/div/div/div[3]')
    const [dogNames] = await page.$x('/html/body/div[1]/div[2]/div/div/div[3]');
    const valueof = await dogNames.getProperty('textContent');
    const textV = await valueof.jsonValue();
    // fsLibrary.writeFile('dogNames.txt',textV.split(/(?=[a-z][A-Z])/).toString(),(error) => { 
    //     if (error) throw err; 
    // });
    console.log('DATA IS: \n' + textV.split(/(?=[a-z][A-Z])/) + '\n');
    browser.close();
}

async function getAmazonProducts(product,pages){
    const browser = await puppeteer.launch({ headless: true });
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

//getWeatherFromCity('Haifa');
//getAmazonProducts('iphone',2);
getDogsName();
async function randomWord(){
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    let randomPage = Math.floor(Math.random() * 1111);
    console.log('https://www.urbandictionary.com/random.php?page=' + randomPage);
    await page.goto('https://www.urbandictionary.com/random.php?page=' + randomPage);
    //await page.waitForXPath('//*[@id="content"]/div[1]/div[2]/a'); // //*[@id="content"]/div[1]/div[2]/a
    //await page.waitForXPath('//*[@id="content"]/div[1]/div[3]'); // //*[@id="content"]/div[1]/div[3]
    const [titleWords] = await page.$x('//*[@id="content"]/div[1]/div[2]/a');
    const [discWords] = await page.$x('//*[@id="content"]/div[1]/div[3]');
    const valueof1 = await titleWords.getProperty('textContent');
    const valueof2= await discWords.getProperty('textContent');
    const word = await valueof1.jsonValue();
    const disc = await valueof2.jsonValue();
   console.log('The Word: ' + word + ' meaning is: ' + disc);
}

//randomWord();
//getWeatherFromCity('Tel Aviv');
