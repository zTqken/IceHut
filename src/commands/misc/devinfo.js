const { Constants } = require('discord.js');

module.exports = {
  name: 'developerinfo',
  aliases: ['devinfo', 'whoisdev'],
  description: 'Know about my developer!',
  usage: '',
  category: 'information',

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const ownerTag = client.users.cache.get(client.application.ownerId)?.tag || '<@467189171610583040>';

    const developerInfoEmbed = {
      title: 'Developer Information',
      color: 0x000000, // Black color
      thumbnail: {
        url: client.users.cache.get(client.application.ownerId)?.displayAvatarURL({ dynamic: true }) || '',
      },
      description: `***You may contact the developer by clicking this [link](https://discord.gg/rfUFA3wXHy)!***`,
      fields: [
        {
          name: 'GitHub',
          value: 'https://github.com/zTqken',
        },
        {
          name: 'Custom Discord Status',
          value: client.users.cache.get(client.application.ownerId)?.presence?.activities[0]?.state || '***<@1196277306059149312> is being worked on.***',
        },
        {
          name: 'Status',
          value: client.users.cache.get(client.application.ownerId)?.presence.status || '***Do Not Disturb***',
        },
        {
          name: 'Joined Discord',
          value: client.users.cache.get(client.application.ownerId)?.createdAt.toUTCString() || '',
        },
      ],
      timestamp: new Date(),
      footer: {
        text: `Developer Info Command | Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }) || '',
      },
    };

    interaction.editReply({ embeds: [developerInfoEmbed] });
  },
};
