const config = require('../botconfig/config.json');
const {
  promisify
} = require("util");
const {
  glob
} = require("glob");
const PG = promisify(glob);
const mongoose = require('mongoose');

/**
 * @param {Client} client 
 */

module.exports = async (client) => {
  try {
    if (config.Enable_MongoDB) {
    (await PG(`${process.cwd()}/structures/handlers/mongoDB_Events/*.js`)).map(async (file) => {
      const event = require(file);
      if (event.once) {
        mongoose.connection.once(event.name, (...args) => event.execute(client, ...args));
      } else {
        mongoose.connection.on(event.name, (...args) => event.execute(client, ...args));
      }
    })
    client.logger(`Connecting to MongoDB`.bold.yellow);

    mongoose.Promise = global.Promise;
    await mongoose.connect(config.env.MongoDB_TOKEN || process.env.MongoDB_TOKEN, {
      //useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
  }

  } catch (e) {
    console.log(e)
  }
};

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/milanio
 * @INFO
 * Work for Milanio Development | https://discord.gg/milanio
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */