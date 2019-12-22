const path = require('path');
const nouns = require('noun-json');
const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch();
	
	const page = await browser.newPage();
	await page.setViewport({width: 1280, height: 720});
	await page.goto(`file:${path.join(__dirname, 'index.html')}`, {waitUntil: 'networkidle0'});
	
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	await page.$eval('#noun', (element, text) => element.innerHTML = text, noun);
	
	await page.screenshot({path: 'screenshot.png'});
	
	await browser.close();
})();
