require('dotenv').config();
const path = require('path');
const fs = require('fs');
const nouns = require('noun-json');
const puppeteer = require('puppeteer');
const Twitter = require('twitter');

async function createImage(noun) {
	const pagePath = path.join(__dirname, 'index.html');
	const imagePath = 'screenshot.png';

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({width: 1280, height: 720});
	await page.goto(`file:${pagePath}`, {waitUntil: 'networkidle0'});
	await page.$eval('#noun', (element, text) => element.innerHTML = text, noun);
	await page.screenshot({path: imagePath});
	await browser.close();
	
	return imagePath;
}

async function tweet(status, mediaPath) {
	const client = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});
	const mediaData = fs.readFileSync(mediaPath);
	const media = await client.post('media/upload', {media: mediaData});
	await client.post('statuses/update', {status: status, media_ids: media.media_id_string});
}

(async () => {
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	const imagePath = await createImage(noun);
	await tweet(`Get ${noun} done`, imagePath);
})();
