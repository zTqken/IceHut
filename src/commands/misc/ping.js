module.exports = {
  name: 'ping',
  description: 'Replies with the bot ping!',

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    const embed = {
      title: 'Ping Results',
      description: `Client: ${ping}ms\nWebsocket: ${client.ws.ping}ms`,
      color: 0x00FF00, // Green color
      fields: [
        {
          name: 'Client Latency',
          value: `${ping}ms`,
          inline: true,
        },
        {
          name: 'Websocket Latency',
          value: `${client.ws.ping}ms`,
          inline: true,
        },
        {
          name: 'Server',
          value: interaction.guild.name,
        },
        {
          name: 'Bot Version',
          value: '1.0.0',
        },
        {
          name: 'Total Members',
          value: interaction.guild.memberCount.toString(),
        },
      ],
      timestamp: new Date(),
      footer: {
        text: `Ping Command | Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      },
    };

    if (interaction.guild.region) {
      embed.fields.push({
        name: 'Server Region',
        value: interaction.guild.region.toUpperCase(),
      });
    }

    interaction.editReply({
      content: 'Pong!',
      embeds: [embed]
    });
  },
};