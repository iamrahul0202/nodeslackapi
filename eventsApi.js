const { createEventAdapter } = require('@slack/events-api');
const constants = require('./constants')
const { logger } = require('./logger')

const slackSigningSecret = process.env.signingKeySecret || constants.signingKeySecret;
const slackEvents = createEventAdapter(slackSigningSecret);

const { WebClient } = require('@slack/web-api');
const token = process.env.token || constants.token;
const web = new WebClient(token);

slackEvents.on('message', (event) => {
    //console.dir(event)
    logger.info(event);

    if(event.client_msg_id){
        let ack = {
            token: token,
            text: `Received Message - ${event.text}`,
            channel: payload.channel.id
        }
        web.chat.postMessage(ack)
    }
});

module.exports = function (app, path) {
    app.use(path, slackEvents.requestListener());
}