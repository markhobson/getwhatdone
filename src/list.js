require('dotenv').config();
const Twitter = require('twitter');

function createClient() {
	return new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});
}

async function timeline(callback) {
	const client = createClient();
	const params = {count: 200};
	let more = true;
	
	while (more) {
		const tweets = await client.get('statuses/user_timeline', params);
		
		// max_id is inclusive so subsequent pages duplicate last tweet
		callback(tweets.slice(params.max_id ? 1 : 0));
		
		if (tweets.length === params.count) {
			params.max_id = tweets[tweets.length - 1].id_str;
		}
		else {
			more = false;
		}
	}
}

function writeHeader() {
	console.log(`${'Id'.padEnd(19)} | ${'Created At'.padEnd(24)} | Text`);
	console.log(`${'-'.repeat(19)}-+-${'-'.repeat(24)}-+-${'-'.repeat(32)}`);
}

function writeTweet(tweet) {
	console.log(`${tweet.id_str} | ${new Date(tweet.created_at).toISOString()} | ${tweet.text}`);
}

(async () => {
	try {
		writeHeader();
		await timeline(tweets => tweets.forEach(writeTweet));
	}
	catch (error) {
		console.error(error);
	}
})();
