const {Client} = require('discord.js');
const bot = new Client();
const fs = require('fs');
const axios = require('axios');

// the URL of the server to connect to
// these change depending on whether this is the production or the development branch
const appUrl = 'http://129.146.252.87:3000'
const serverUrl = 'http://129.146.252.87:3001';

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

    // set start typing
    msg.channel.startTyping();

    // get channel's history
    fetchHistory(channel, msg.id).then((messages) => {
      // report
      console.log('Found ' + messages.length +
        ' messages in channel ' + channel.name);

      // find all attachments
      const attachments = [];
      messages.forEach((msg) => {
        // for all messages with an author and attachments
        if (msg.member !== null) {
          // create a new info object for it
          const nickname = msg.member.displayName;
          const date = msg.createdAt;
          msg.attachments.forEach((msgAttachment) => {
            attachments.push({
              'author': nickname,
              'url': msgAttachment.url,
              'date': date,
            });
          });
        }
      });

      // send attachments info to server
      const info = {
        'guildId': channel.guild.id,
        'guildName': channel.guild.name,
        'channelId': channel.id,
        'channelName': channel.name,
        'authorId': msg.author.id,
        'authorUsername': msg.author.username,
        'attachments': attachments,
      };

      // send to server
      axios.post(
        serverUrl + '/api',
        info
      )
      // on good response
      .then((res) => {
        const id = res.data.id;
        channel.send(appUrl + '/#/' + id);
      })
      // on bad response
      .catch((error) => {
        channel.send('Error when accessing server');
        channel.send(error.message);
      })
      // stop typing
      .finally(() => {
        channel.stopTyping();
      })
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
