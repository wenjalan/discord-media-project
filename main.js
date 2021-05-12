const {Client} = require('discord.js');
const bot = new Client();

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

    // get the channel's history
    channel.messages.fetch({limit: 100})
        .then((messages) => {
          // send info
          channel.send('Found ' + messages.size + ' messages.');

          // find all attachments
          const attachments = [];
          messages.forEach((msg) => {
            msg.attachments.forEach((msgAttachment) => {
              attachments.push(msgAttachment);
            })
          });

          // send info
          channel.send('Found ' + attachments.length + ' attachments');
          attachments.forEach((attachment) => {
            console.log(attachment.url);
          });
        })
        .catch((error) => {
          console.error(error);
        })
  }
});

// login and start bot
bot.login('NTU2OTg3MDc1MzA4ODE0MzQ2.XI7cow.2oyHp8S3ck_QTrAl5Mah3CGxFWI');
bot.generateInvite().then((invite) => {
  console.log('Bot started: ' + invite);
});
