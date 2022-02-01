const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const eec = require(`${process.cwd()}/structures/botconfig/embed.json`);
const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require('discord.js');

module.exports = {
  name: "help",
  aliases: ["h", "helpme"],
  usage: "help [cmdname]",
  description: "Returns all Commmands, or one specific command",
  category: "info",
  cooldown: 10,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee, prefix) {
    try {

      if (args[0]) {
        const embed = new MessageEmbed()
          .setColor(ee.color)

        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        if (!cmd) {
          return message.reply({
            embeds: [embed
              .setColor(ee.wrongcolor)
              .setDescription(`${client.allEmojis.x} No Information found for the command **${args[0].toLowerCase()}**`)
            ]
          });
        }
        if (cmd.name) embed.setTitle(`${client.allEmojis.y} Information About the Commands`);
        if (cmd.name) embed.addField("**🎧 Command name**", `\`\`\`${cmd.name}\`\`\``);
        if (cmd.description) embed.addField("**🎧 Description**", `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases) try {
          embed.addField("**🎧 Aliases**", `\`\`\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\`\`\``);
        } catch {}
        if (cmd.cooldown) embed.addField("**🎧 Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField("**🎧 Usage**", `\`\`\`${prefix}${cmd.usage}\`\`\``);
        }
        return message.reply({
          embeds: [embed]
        });
      } else {
        let supportbutton = new MessageButton().setStyle("LINK").setLabel("Join Support").setURL(config.env.SUPPORT || process.env.SUPPORT)
        let invitebutton = new MessageButton().setStyle("LINK").setLabel("Invite Me").setURL(config.env.INVITE || process.env.INVITE)
        let websitebutton = new MessageButton().setStyle("LINK").setLabel("Check Website").setURL(config.env.WEBSITE || process.env.WEBSITE)

        const row = new MessageActionRow()
          .addComponents(supportbutton, invitebutton, websitebutton);

        const helpEMbed = new MessageEmbed()
          .setColor(ee.color)
          .setThumbnail(client.user.displayAvatarURL({
            dynamic: true
          }))
          .setTimestamp()
          .setImage(eec.gif)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon})
          .setAuthor({ name: `${client.user.username} Help Menu`, iconURL: client.user.displayAvatarURL({ dynamic: true })})
          .addFields({
            name: `🔰┃INFORMATION`,
            value: `>>> ${client.commands.filter((cmd) => cmd.category === "info").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
          }, {
            name: `💪┃SETUP`,
            value: `>>> ${client.commands.filter((cmd) => cmd.category === "setup").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
          }, {
            name: `🎶┃MUSIC`,
            value: `>>> ${client.commands.filter((cmd) => cmd.category === "music").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
          }, {
            name: `🔨┃UTILITY`,
            value: `>>> ${client.commands.filter((cmd) => cmd.category === "utility").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`
          })

        message.reply({
          embeds: [helpEMbed],
          components: [row]
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
}
