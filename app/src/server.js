// require express
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

// create express server
const key = fs.readFileSync('../ssl/key.pem');
const cert = fs.readFileSync('../ssl/cert.pem');
console.log('Loaded key and cert:');
console.log(key);
console.log(cert);
const server = express();
const ssl = https.createServer({key: key, cert: cert}, server);
server.use(express.json());
server.use(cors());

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
server.get("/api/:id", (req, res) => {
  // return the post data corresponding to the id
  const reqId = req.params.id;
  const info = data["" + reqId];

  // if there was no info object for that id, complain
  if (info === undefined) {
    res.send("Error: No info with id " + reqId);
  }

  // send back the info object
  res.send(data["" + reqId]);
})

// start server
fs.readFile("../server_cfg.json", "utf8", (err, data) => {
  const cfg = JSON.parse(data);
  const port = cfg.port;
  ssl.listen(port, () => {
    console.log("Server started on port " + port);
  });
});



