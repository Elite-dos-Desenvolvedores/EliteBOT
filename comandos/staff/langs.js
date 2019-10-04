const _ = require('lodash');

const config = require('../config.json');
const {
    districtEmojis
} = require('../../utils/emojiRoles.js');

/**
 * Add member from role.
 *
 * @param {Discord.Member} member
 * @param {Number} roleId
 *
 * @return {Promise}
 */
const addRole = (member, roleId) => member.addRole(roleId);

/**
 * Remove o cargo do membro
 *
 * @param {Discord.Member} member
 * @param {Number} roleId
 *
 * @return {Promise}
 */
const removeRole = (member, roleId) => member.removeRole(roleId);

/**
 * Insire as reações no embed
 *
 * @param {Discord.Event} event
 * @param {Discord.Client} client
 *
 * @return {void}
 */

exports.run = (addRole, removeRole) => {
    const toggleDistrictRoles = (event, client) => {
        const {
            d: data
        } = event;
        const channel = client.channels.get(data.channel_id);


        if (channel.id !== config.rolesChannel) return;

        // const user = client.users.get(data.user_id);
        const guild = client.guilds.get(data.guild_id);
        const member = guild.members.get(data.user_id);
        const district = districtEmojis.find(districtEmoji => districtEmoji.emoji === data.emoji.name);
        const districtRoleId = _.get(district, 'roleId', null);

        try {

            if (event.t === 'MESSAGE_REACTION_ADD' && districtRoleId) {
                addRole(member, districtRoleId);
            }


            if (event.t === 'MESSAGE_REACTION_REMOVE' && districtRoleId) {
                removeRole(member, districtRoleId);
            }
        } catch (err) {

        }
    };

};


exports.help = {
    name: 'langs'
}