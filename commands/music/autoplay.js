const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'autoplay',
    aliases: [],
    usage: '',
    description: '',
    category: "music",
    cooldown: 0,
    userPermissions: "",
    botPermissions: "",
    ownerOnly: false,
    toggleOff: false,

    /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, args, ee) {
        try {

            const {
                member,
                guild,
            } = message;

            const {
                channel
            } = member.voice;


            const VoiceChannel = member.voice.channel;

            if (!VoiceChannel) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.x} Please Join a Voice Channel`)
                ]
            });

            if (channel.userLimit != 0 && channel.full)
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter({text: ee.footertext, iconURL: ee.footericon})
                        .setTitle(`Your Voice Channel is full, I can't join!`)
                    ]
                });


            if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`I am already playing music in <#${guild.me.voice.channelId}>`)
                ]
            });

            const queue = await client.distube.getQueue(VoiceChannel);
            if (!queue) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.x} There is no Song in the Queue.`)
                ]
            });

            let Mode = await queue.toggleAutoplay(VoiceChannel);
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.music.autoplay} Autoplay Mode is set to: \`${Mode ? "On" : "Off"}\``)
                ]
            });


        } catch (e) {
            console.log(e)
            return message.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`⛔ Error`)
                    .setDescription(`${e}`)
                ]
            })
        }
    }
}