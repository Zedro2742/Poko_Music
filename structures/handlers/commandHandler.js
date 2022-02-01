const {
  Client
} = require("discord.js");
const {
  Perms
} = require("../validator/permissions");
const {
  promisify
} = require("util");
const {
  glob
} = require("glob");
const PG = promisify(glob);

/**
 * @param {Client} client 
 */

module.exports = async (client) => {
  try {
    let amount = 0;
    (await PG(`${process.cwd()}/commands/*/*.js`)).map(async (file) => {
      const command = require(file);
      if (command.name) {
        client.commands.set(command.name, command);
        amount++;
      } else {
        await client.logger(`Command Error: ${command.name || "Missing Name"} | Directory: ${file.split("/")[6] + `/` + file.split("/")[7]}`.brightRed);
        return;
      }
      if (command.userPermissions) {
        if (!Perms.includes(command.userPermissions)) return await client.logger(`Command Error: Invalid Permission | Directory: ${file.split("/")[6] + `/` + file.split("/")[7]}`.brightRed);
      }
      if (command.botPermissions) {
        if (!Perms.includes(command.botPermissions)) return await client.logger(`Command Error: Invalid Permission | Directory: ${file.split("/")[6] + `/` + file.split("/")[7]}`.brightRed);
      }
      if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
    });
    await client.logger(`${amount} Commands Loaded`.brightGreen);
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/milanio
 * @INFO
 * Work for Milanio Development | https://discord.gg/milanio
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */