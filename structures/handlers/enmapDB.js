const Enmap = require("enmap");

module.exports = async (client) => {
  client.settings = new Enmap({
    name: "settings",
    dataDir: "./databases/settings"
  });
  client.logger(`Started EnmapDB`.brightGreen);
}

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/8fYUFxMtAq
 * @INFO
 * Work for Milanio Development | https://discord.gg/8fYUFxMtAq
 * @INFO
 */