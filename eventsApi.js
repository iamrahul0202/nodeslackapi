const { createEventAdapter } = require('@slack/events-api');
const constants = require('./constants')
const { logger } = require('./logger')

const slackSigningSecret = process.env.signingKeySecret || constants.signingKeySecret;
const slackEvents = createEventAdapter(slackSigningSecret);


slackEvents.on('message', (event) => {
    logger.info(`Received event ${event}`);
});

module.exports = function (app, path) {
    app.use(path, slackEvents.requestListener());
}