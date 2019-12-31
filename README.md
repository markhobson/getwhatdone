# Get What Done

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
