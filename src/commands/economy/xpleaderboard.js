const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const canvacord = require('canvacord');
const calculateLevelXp = require('../../utils/calculateLevelXp');
const Level = require('../../models/Level');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      return interaction.reply('You can only run this command inside a server.');
    }

    await interaction.deferReply();

    try {
      let allLevels = await Level.find({ guildId: interaction.guild.id }).select(
        '-_id userId level xp'
      );

      allLevels.sort((a, b) => {
        if (a.level === b.level) {
          return b.xp - a.xp;
        } else {
          return b.level - a.level;
        }
      });

      const leaderboardEmbed = {
        color: 0x3498db,
        title: ':trophy: **Leaderboard** :trophy:',
        description: 'Top 10 Users by Level and XP',
        fields: allLevels.slice(0, 10).map((user, index) => ({
          name: `#${index + 1} ${client.users.cache.get(user.userId)?.tag || 'Unknown User'}`,
          value: `Level: ${user.level} | XP: ${user.xp}`,
          inline: false,
        })),
      };

      return interaction.editReply({ embeds: [leaderboardEmbed] });
    } catch (error) {
      console.log(`Error with /xpboard: ${error}`);
      return interaction.editReply('An error occurred while fetching the leaderboard.');
    }
  },

  name: 'xpboard',
  description: 'Show the top users by level and XP.',
};
