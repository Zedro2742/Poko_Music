const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
    Client,
    CommandInteraction,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'loop',
    usage: '',
    description: 'Repeat the current Queue/Song/Off',
    category: "music",
    cooldown: 0,
    userPermissions: "",
    botPermissions: "",
    ownerOnly: false,
    toggleOff: false,
    options: [{
        name: "query",
        description: "Provide a name or a url for the song",
        type: "STRING",
        required: true,
    }],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    async execute(client, interaction, args, ee) {
        const {
            options,
            member,
            guild,
            channel
        } = interaction;

        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel) return interaction.reply({
            embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setTimestamp()
                .setTitle(`${client.allEmojis.x} Please Join a Voice Channel`)
            ],
            ephemeral: true
        });

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return interaction.reply({
            embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setTimestamp()
                .setDescription(`**I am already playing music in <#${guild.me.voice.channelId}>**`)
            ],
            ephemeral: true
        });

        try {

            const queue = await client.distube.getQueue(VoiceChannel);
            if (!queue) return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.x} There is no Song in the Queue.`)
                ]
            });

            let Mode2 = await client.distube.setRepeatMode(queue);

            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.music.loop} Loop Mode is set to: \`${Mode2 = Mode2 ? Mode2 == 2 ? "Queue" : "Song" : "Off"}\``)
                    .setFooter({text: `💢 Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({
                        dynamic: true
                    })})
                    .setTimestamp()
                ]
            });

        } catch (e) {
            console.log(e)
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`⛔ Error`)
                    .setDescription(`${e}`)
                ]
            })
        }

    }
}