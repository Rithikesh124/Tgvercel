const { Telegraf } = require('telegraf');

// WARNING: Do NOT do this in a real project. Your token is exposed!
const BOT_TOKEN = '8475840633:AAEjkYlX3wGKdUMr3ZkIMkarmIcGJupMxM8'; // <--- PASTE YOUR TOKEN HERE
const bot = new Telegraf(BOT_TOKEN);

// This is the main function that Vercel will run
const handler = async (req, res) => {
  try {
    // Define bot commands and actions here
    bot.start((ctx) => ctx.reply('Hello! This is your bot.'));
    bot.help((ctx) => ctx.reply('This is a simple help message.'));
    bot.on('text', (ctx) => ctx.reply('You said: ' + ctx.message.text));

    // Process the incoming update from Telegram
    await bot.handleUpdate(req.body, res);
  } catch (err) {
    console.error('Error handling update:', err);
  }
};

module.exports = handler;
