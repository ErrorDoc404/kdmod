const { createCanvas, loadImage } = require("canvas");

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
        message.channel.send("welcome");
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