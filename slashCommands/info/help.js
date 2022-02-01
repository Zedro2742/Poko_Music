const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const eec = require(`${process.cwd()}/structures/botconfig/embed.json`);
const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require("discord.js");

module.exports = {
  name: "help",
  usage: '',
  description: "Returns all Commmands, or one specific command",
  category: "info",
  cooldown: 10,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client 
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  async execute(client, interaction, args, ee, prefix) {
    try {

      let supportbutton = new MessageButton().setStyle("LINK").setLabel("Join Support").setURL(config.env.SUPPORT || process.env.SUPPORT)
      let invitebutton = new MessageButton().setStyle("LINK").setLabel("Invite Me").setURL(config.env.SUPPORT || process.env.INVITE)
      let websitebutton = new MessageButton().setStyle("LINK").setLabel("Check Website").setURL(config.env.SUPPORT || process.env.WEBSITE)

      const row = new MessageActionRow()
        .addComponents(supportbutton, invitebutton, websitebutton);

      const helpEMbed = new MessageEmbed()
        .setColor(ee.color)
        .setThumbnail(client.user.displayAvatarURL({
          dynamic: true
        }))
        .setTimestamp()
        .setImage(eec.gif)
        .setFooter({
          text: ee.footertext,
          iconURL: ee.footericon
        })
        .setAuthor({
          name: `${client.user.username} Help Menu`,
          iconURL: client.user.displayAvatarURL({
            dynamic: true
          })
        })
        .addFields({
          name: `🔰┃INFORMATION`,
          value: `>>> ${client.slashCommands.filter((cmd) => cmd.category === "info").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
        }, {
          name: `🎶┃MUSIC`,
          value: `>>> ${client.slashCommands.filter((cmd) => cmd.category === "music").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
        })

      interaction.reply({
        embeds: [helpEMbed],
        components: [row]
      })
    } catch (err) {
      console.log(err)
    }
  }
}