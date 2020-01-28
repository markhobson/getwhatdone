# Get What Done

Twitter bot [@getwhatdone](https://twitter.com/getwhatdone) that tweets platitudes to get things done. Heavily inspired by [cool-robot-pals/getreadyfor](https://github.com/cool-robot-pals/getreadyfor).

![Get Skullduggery Done](https://pbs.twimg.com/media/ENFWTWoWoAQ7qEh?format=png&name=large)

## How it works

Every hour `job.js` is run. This loads the HTML template into headless Chrome using [Puppeteer](https://pptr.dev/), inserts a random noun from [noun-json](https://github.com/sapics/noun-json), takes a screenshot and tweets it using [node-twitter](https://github.com/desmondmorris/node-twitter). 

## Running locally

1. Create `.env` with the Twitter bot credentials:
   ```
   TWITTER_CONSUMER_KEY=XXX
   TWITTER_CONSUMER_SECRET=XXX
   TWITTER_ACCESS_TOKEN_KEY=XXX
   TWITTER_ACCESS_TOKEN_SECRET=XXX
   ```
1. Install dependencies:
   ```
   npm install
   ```
1. Run the job:
   ```
   npm run job
   ```

There is also a placeholder webapp `app.js` to occupy the Heroku web process. To run this:

```
npm start
```

Then visit http://localhost:3000/.

## Deploying to Heroku

1. Create app:
   ```
   heroku create getwhatdone --region eu --buildpack heroku/nodejs
   heroku buildpacks:add jontewks/puppeteer
   ```
1. Configure app for Twitter:
   ```
   heroku config:set TWITTER_CONSUMER_KEY=XXX \
       TWITTER_CONSUMER_SECRET=XXX \
       TWITTER_ACCESS_TOKEN_KEY=XXX \
       TWITTER_ACCESS_TOKEN_SECRET=XXX
   ```
1. Deploy app:
   ```
   git push heroku master
   ```
1. Schedule job:
   ```
   heroku addons:create scheduler:standard
   heroku addons:open scheduler
   ```
   Add job to run `npm run job` every hour

## Listing tweets

To list all previous tweets:

```
npm run list
```

Example output:

```
Id                  | Created At               | Text
--------------------+--------------------------+---------------------------------
1210271071955570688 | 2019-12-26T18:48:03.000Z | Get earthworm done https://t.co/wg1Eg9FCAP
1210263078572580865 | 2019-12-26T18:16:18.000Z | Get gather done https://t.co/2UCVPP0RAV
1210262953158758400 | 2019-12-26T18:15:48.000Z | Get brother done https://t.co/k9unIt5Hk6
```

The `Id` can then be used to obtain the tweet URL.
