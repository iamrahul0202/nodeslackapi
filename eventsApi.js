const { createEventAdapter } = require('@slack/events-api');
const constants = require('./constants')
const { logger } = require('./logger')

const slackSigningSecret = constants.signingKeySecret;
const slackEvents = createEventAdapter(slackSigningSecret);


slackEvents.on('message', (event) => {
    logger.info(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

module.exports = function (app, path) {
    app.use(path, slackEvents.requestListener());
}