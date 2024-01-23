const { Client, Interaction } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  name: 'leaderboard',
  description: 'Show the top users by balance',
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      return interaction.reply({
        content: 'You can only run this command inside a server.',
        ephemeral: true,
      });
    }

    try {
      await interaction.deferReply();

      const leaderboard = await User.find({ guildId: interaction.guild.id })
        .sort({ balance: -1 })
        .limit(10); // Adjust the limit as needed

      if (!leaderboard.length) {
        return interaction.editReply({
          content: 'There are no users on the leaderboard yet.',
        });
      }

      const embed = {
        color: 0x3498db,
        title: ':trophy: **Leaderboard** :trophy:',
        fields: leaderboard.map((user, index) => ({
          name: `#${index + 1} ${client.users.cache.get(user.userId)?.tag || 'Unknown User'}`,
          value: `Balance: ${user.balance} dabloons`,
          inline: false,
        })),
      };

      interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.log(`Error with /leaderboard: ${error}`);
    }
  },
};
