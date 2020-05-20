const constants = require('./constants')
const { WebClient } = require('@slack/web-api');
const token = process.env.token || constants.token;
const web = new WebClient(token);
const channelId = process.env.channelId || 'D014KRM0RRN' //D014KRM0RRN  C0145EMSSEQ

async function deleteChat(msg) {
    return await web.chat.delete({
        token: constants.botToken,
        channel: channelId,
        ts: msg.ts
    }).catch(err => console.log(`err.... ${err.data.error}`))
}

function clean() {
    //fetching all conversations for a channel

    web.conversations.history({
        token: constants.adminToken,
        channel: channelId
    }).then(res => {
        let promises = [];
        for (const msg of res.messages) {
            promises.push(deleteChat(msg))
        }

        return Promise.all(promises)

    }).then((r) => {
        console.dir(r)
        console.log('Successfully deleted all the chats')
    }).catch((err) => {
        console.log('catch....')
        console.dir(err)
    })
}


clean()