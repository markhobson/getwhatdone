require('dotenv').config();
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const nouns = require('noun-json');
const Twitter = require('twitter');

async function createImage(noun, imagePath) {
	const pagePath = path.join(__dirname, 'index.html');

	const browser = await puppeteer.launch({args: ['--no-sandbox']});
	const page = await browser.newPage();
	await page.setViewport({width: 1280, height: 720});
	await page.goto(`file:${pagePath}`, {waitUntil: 'load'});
	await page.$eval('#noun', (element, text) => element.innerHTML = text, noun);
	await page.screenshot({path: imagePath});
	await browser.close();
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
	const imagePath = 'screenshot.png';
	
	try {
		await createImage(noun, imagePath);
		await tweet(`Get ${noun} done`, imagePath);
		console.log(`Get ${noun} done`);
	}
	catch (error) {
		console.error(error);
	}
})();
