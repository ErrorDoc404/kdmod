const { AttachmentBuilder } = require("discord.js");
const { DiscordProfile } = require('kdprod');
const canvas = new DiscordProfile();

module.exports = {
    name: "welcome",
    description: "Get welcome banner",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: [],
    category: "",
    run: async (client, message) => {
        try {

            let imageURL = 'https://i.imgur.com/ea9PB3H.png';
            const image = await canvas.welcome(message.author, { link: imageURL, blur: false });

            message.channel.send({ files: [image] });
        } catch (e) {
            console.log(e);
        }
    },
    SlashCommand: {
        /**
       *
       * @param {import("../library/DiscordModerationBot")} client
       * @param {import("discord.js").Message} message
       * @param {string[]} args
       * @param {*} param3
       */
        run: async (client, interaction) => {

        },
    }
}