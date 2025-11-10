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

  if (interaction.guild.ownerId !== interaction.user.id) return interaction.reply({ content: 'คุณไม่มีสิทธิ์ไช้คำสั่งนี้ 👑', ephemeral: true }

    
  ); 

});
if (commandName === 'all') {
  const title = interaction.options.getString('title');
  const message = interaction.options.getString('message');

  // สร้าง Embed
  const embed = new EmbedBuilder()
    .setColor('#00BFFF')
    .setTitle(title)
    .setDescription(message)
    .setFooter({ 
      text: `ส่งโดย ${interaction.user.username}`, 
      iconURL: interaction.user.displayAvatarURL() 
    });

  // ตอบกลับในแชทว่ากำลังส่ง
  await interaction.reply({ content: '📨 กำลังส่งข้อความไปยังสมาชิกทุกคน...', ephemeral: true });

  const guild = interaction.guild;

  // ดึงสมาชิกทั้งหมด
  await guild.members.fetch();

  let sentCount = 0;
  for (const member of guild.members.cache.values()) {
    if (!member.user.bot) {
      try {
        await member.send({ embeds: [embed] });
        sentCount++;
      } catch (err) {
        console.log(`❌ ส่งหา ${member.user.tag} ไม่ได้`);
      }
    }
  }

  await interaction.followUp({ content: `✅ ส่งข้อความไปแล้วทั้งหมด ${sentCount} คน`, ephemeral: true });
}


client.login(process.env.BOT_TOKEN);
