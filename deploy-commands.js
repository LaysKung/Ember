import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('บอทจะตอบ pong และแสดงความหน่วงเวลา'),
  new SlashCommandBuilder()
    .setName('say')
    .setDescription('ให้บอทพูดข้อความตามที่คุณพิมพ์')
    .addStringOption(option =>
      option.setName('ข้อความ').setDescription('พิมพ์ข้อความที่ต้องการให้บอทพูด').setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('embed')
    .setDescription('สร้างข้อความแบบ Embed สวย ๆ')
    .addStringOption(option =>
      option.setName('title').setDescription('หัวข้อของ Embed').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('description').setDescription('เนื้อหาข้อความของ Embed').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('image').setDescription('ลิงก์รูปภาพ (ไม่บังคับ)')
    )
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('กำลังลงทะเบียน Slash Commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ ลงทะเบียน Slash Commands สำเร็จ!');
  } catch (error) {
    console.error(error);
  }
})();
