const GuildConfig = require("../mongoose/database/schemas/GuildConfig");
const RankRole = require("../mongoose/database/schemas/RankRole");
const Level = require("../mongoose/database/schemas/Level");

module.exports = async (client, message) => {

    if (message.author.bot || message.channel.type === 'dm') return;

    const { guild, content } = message;

    // Combine database queries for better efficiency
    const { prefix: serverPrefix } = (await GuildConfig.findOne({ guildId: guild.id })) || {};
    let GuildDB = await client.GetGuild(guild.id);
    const { prefix: guildPrefix } = GuildDB || {};

    // Consolidate prefix assignment
    const prefix = serverPrefix || guildPrefix;

    const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    const usedPrefix = content.match(prefixMention) ? content.match(prefixMention)[0] : prefix;

    if (!content.startsWith(usedPrefix)) return;

    const args = content.slice(usedPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd =
        client.commands.get(command) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(command));

    // Remove unnecessary console.log statement

    //Executing the codes when we get the command or aliases
    if (!cmd) return;

    const { member, channel } = message;

    if (
        (cmd.permissions &&
            cmd.permissions.member &&
            !channel.permissionsFor(member).has(cmd.permissions.member)) ||
        (cmd.permissions &&
            cmd.permissions.channel &&
            !channel.permissionsFor(client.user).has(cmd.permissions.channel)) ||
        (cmd.permissions &&
            GuildDB.modRole &&
            !channel.permissionsFor(member).has(["ADMINISTRATOR"]) &&
            !member.roles.cache.has(GuildDB.modRole))
    ) {
        return message.channel.send({ content: "**You do not have permission to use this command.**" });
    }

    if (cmd.premium) {
        return message.channel.send({ content: "**This command is premium only.**" });
    }

    console.log(cmd);
    cmd.run(client, message, args, { GuildDB });
    client.CommandsRan++;

}