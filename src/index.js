require('dotenv').config();
const path = require('path');
const fs = require('fs');
const nouns = require('noun-json');
const puppeteer = require('puppeteer');
const Twitter = require('twitter');

async function tweet(path) {
	const client = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});
	const data = fs.readFileSync(path);
	const media = await client.post('media/upload', {media: data});
	await client.post('statuses/update', {media_ids: media.media_id_string});
}

(async () => {
	const browser = await puppeteer.launch();
	
	const page = await browser.newPage();
	await page.setViewport({width: 1280, height: 720});
	await page.goto(`file:${path.join(__dirname, 'index.html')}`, {waitUntil: 'networkidle0'});
	
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	await page.$eval('#noun', (element, text) => element.innerHTML = text, noun);
	
	await page.screenshot({path: 'screenshot.png'});
	
	await browser.close();
	
	await tweet('screenshot.png');
})();
