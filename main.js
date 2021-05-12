const {Client} = require('discord.js');
const bot = new Client();
const fs = require('fs');

// retrieves all of a channel's messages, starting from a
// given message and going backwards in time
const fetchHistory = async (channel, fromId) => {
  // variables to track
  let lastMsgId = fromId;
  let lastRetrieved = -1;
  const messages = [];

  // keep fetching messages while there are more
  while (lastRetrieved === 100 || lastRetrieved === -1) {
    const retrievedMessages = await channel.messages.fetch(
        {
          limit: 100,
          before: lastMsgId,
        },
    );

    // push all the messages
    retrievedMessages.forEach((msg) => {
      messages.push(msg);
    });

    // update tracking variables
    const lastMsg = messages[messages.length - 1];
    lastMsgId = lastMsg.id;
    lastRetrieved = retrievedMessages.size;

    // log progress
    if (messages.length % 1000 === 0) {
      console.log('\tRetrieved ' + messages.length + ' messages so far...');
    }
  }

  // return all the retrieved messages
  return messages;
};

// on message
bot.on('message', (msg) => {
  // if it was sent by a bot ignore it
  if (msg.author.bot) {
    return;
  }

  // extract message
  const msgContent = msg.content;

  // if the message was a !gallery command
  if (msgContent.startsWith('!gallery')) {
    // generate a webpage for this channel's media
    const channel = msg.channel;

    // if the channel isn't a text channel, complain
    if (channel.type !== 'text') {
      // complain
      channel.send('This isn\'t a valid channel.');
      return;
    }

    // log
    console.log('Fetching messages in channel ' + msg.channel.name + '...');

    // get channel's history
    fetchHistory(channel, msg.id).then((messages) => {
      // report
      console.log('Found ' + messages.length +
        ' messages in channel ' + channel.name);

      // find all attachments
      const attachments = [];
      messages.forEach((msg) => {
        msg.attachments.forEach((msgAttachment) => {
          attachments.push(msgAttachment);
        });
      });

      // send info
      channel.send('Found ' + attachments.length + ' attachments');
      attachments.forEach((attachment) => {
        console.log(attachment.url);
      });
    });
  }
});

// login and start bot
fs.readFile('bot.token', 'utf8', (err, data) => {
  // report errors
  if (err) {
    console.error('Error starting bot: ' + err);
  }

  // get token
  const token = data.substr(0, data.length - 2);

  // log in and start
  bot.login(token);
  bot.generateInvite().then((invite) => {
    console.log('Bot started: ' + invite);
  });
});
