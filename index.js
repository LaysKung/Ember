import 'dotenv/config';
import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
  console.log(`✅ เข้าสู่ระบบเป็น ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('🏓 Pong!');
  }

  if (commandName === 'say') {
    const text = interaction.options.getString('ข้อความ');
    await interaction.reply(`💬 ${text}`);
  }

  if (commandName === 'embed') {
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const image = interaction.options.getString('image');

    const embed = new EmbedBuilder()
      .setColor('#00BFFF')
      .setTitle(title)
      .setDescription(description)
      .setTimestamp()
      .setFooter({ text: `สร้างโดย ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

    if (image) {
      embed.setImage(image);
    }

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.BOT_TOKEN);