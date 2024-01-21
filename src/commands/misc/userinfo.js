const { Constants } = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: 'Displays information about a user',

  options: [
    {
      name: 'user',
      type: 6, // USER type
      description: 'The user to get information about (optional)',
      required: false,
    },
  ],

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const user = interaction.options.getUser('user') || interaction.user;
    // Rest of the code...

    const member = interaction.guild.members.cache.get(user.id);

    const userinfoEmbed = {
      title: 'User Information',
      description: 'Here is some information about the user.',
      color: 0x0000FF,
      thumbnail: {
        url: user.displayAvatarURL({ dynamic: true }),
      },
      fields: [
        {
          name: 'Username',
          value: user.username,
          inline: true,
        },
        {
          name: 'User ID',
          value: user.id,
          inline: true,
        },
        {
          name: 'Discriminator',
          value: user.discriminator,
          inline: true,
        },
        {
          name: 'Bot',
          value: user.bot ? 'Yes' : 'No',
          inline: true,
        },
        {
          name: 'Created At',
          value: user.createdAt.toUTCString(),
        },
        {
          name: 'Joined At',
          value: member.joinedAt.toUTCString(),
        },
        {
          name: 'Roles',
          value: member.roles.cache
            .filter((role) => role.id !== interaction.guild.id)
            .map((role) => role.name)
            .join(' ***|*** '),
        },
      ],
      timestamp: new Date(),
      footer: {
        text: `User Info Command | Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
    },
  };

  interaction.editReply({ embeds: [userinfoEmbed] });
},
};