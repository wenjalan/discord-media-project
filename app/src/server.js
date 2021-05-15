// require express
const express = require('express');
const port = 3000;

// create express server
const server = express();
server.use(express.json());

// map of ids to info objects
const data = {};

// util function for generating IDs
const generateId = (length) => {
  let chars = [];
  let space = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    let c = space.charAt(Math.floor(Math.random() * space.length));
    chars.push(c);
  }
  return chars.join('');
}

// create endpoint for channel post
server.post("/api", (req, res) => {
  const guildId = req.body.guildId;
  const channelId = req.body.channelId;
  const authorId = req.body.authorId;
  console.log("New attachments from channel id " + channelId + "\nfrom guild id " + guildId + "\nby user id" + authorId);
  console.log(req.body);

  // create an id for this channel's data and add it to the data pool
  const id = generateId(8);
  req.body.id = id;
  data[id] = req.body;

  // send id as response
  res.send({
    "id": id,
  });
});

// create endpoint for getting posts
server.get("/api", (req, res) => {
  // return the post data corresponding to the id
  const reqId = req.body.id;
  const info = data["" + reqId];

  // if there was no info object for that id, complain
  if (info === undefined) {
    res.send("Error: No info with id " + reqId);
  }

  // send back the info object
  res.send(data["" + reqId]);
})

// start server
server.listen(port, () => {
  console.log("Server started at URL:3000");
});


