const { Constants } = require('discord.js');

module.exports = {
  name: 'botinfo',
  description: 'Displays information about the bot',

  callback: async (client, interaction) => {
    await interaction.deferReply();

    // Check if client.application.owner is defined
    const ownerTag = client.application.owner ? client.application.owner.tag : '<@467189171610583040>';

    const botInfoEmbed = {
      title: 'Bot Information',
      description: 'Here is some information about the bot.',
      color: 0xFF0000, //red
      thumbnail: {
        url: client.user.displayAvatarURL({ dynamic: true }),
      },
      fields: [
        {
          name: 'Bot Name',
          value: client.user.username,
          inline: true,
        },
        {
          name: 'Bot ID',
          value: client.user.id,
          inline: true,
        },
        {
          name: 'Owner',
          value: ownerTag, // Use the ownerTag variable
          inline: true,
        },
        {
          name: 'Guilds Count',
          value: client.guilds.cache.size,
          inline: true,
        },
        {
          name: 'Users Count',
          value: client.users.cache.size,
          inline: true,
        },
        {
          name: 'Bot Creation Date',
          value: client.user.createdAt.toUTCString(),
        },
      ],
      timestamp: new Date(),
      footer: {
        text: `Bot Info Command | Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      },
    };

    interaction.editReply({ embeds: [botInfoEmbed] });
  },
};
