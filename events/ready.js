/*
 *
 * @param {import("../library/DiscordModerationBot")} client
 */


module.exports = async (client) => {
    (client.Ready = true),
        client.user.setPresence(client.config.presence);
    client.log(`Logged in as ${client.user.tag}!`);
}