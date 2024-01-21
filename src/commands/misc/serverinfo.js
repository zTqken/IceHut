const { Constants } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  description: 'Displays information about the server',

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const guild = interaction.guild;
    const botCount = guild.members.cache.filter(member => member.user.bot).size;

    const serverInfoEmbed = {
      title: 'Server Information',
      description: 'Here is some information about the server.',
      color: 0x00FF00, //green
      thumbnail: {
        url: guild.iconURL({ dynamic: true }),
      },
      fields: [
        {
          name: 'Server Name',
          value: guild.name,
          inline: true,
        },
        {
          name: 'Server ID',
          value: guild.id,
          inline: true,
        },
        {
          name: 'Owner',
          value: guild.ownerId,
          inline: true,
        },
        {
          name: 'Member Count',
          value: guild.memberCount,
          inline: true,
        },
        {
            name: 'Bot Count',
            value: botCount,
            inline: true,
        },
        {
          name: 'Verification Level',
          value: guild.verificationLevel,
          inline: true,
        },
        {
          name: 'Created At',
          value: guild.createdAt.toUTCString(),
        },
      ],
      timestamp: new Date(),
      footer: {
        text: `Server Info Command | Requested by ${interaction.member.user.tag}`,
        iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
      },
    };

    interaction.editReply({ embeds: [serverInfoEmbed] });
  },
};