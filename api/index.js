const { Telegraf } = require('telegraf');

// WARNING: Do NOT do this in a real project. Your token is exposed!
const BOT_TOKEN = '8475840633:AAEjkYlX3wGKdUMr3ZkIMkarmIcGJupMxM8'; // <--- MAKE SURE YOUR TOKEN IS CORRECT
const bot = new Telegraf(BOT_TOKEN);

// This is the main function that Vercel will run
const handler = async (req, res) => {
  try {
    // --- NEW LOGGING CODE ---
    // Log the entire incoming request body from Telegram
    console.log("Received an update:", JSON.stringify(req.body, null, 2));
    // -------------------------

    // Define bot commands and actions
    bot.start((ctx) => ctx.reply('Hello! This is your bot.'));
    bot.help((ctx) => ctx.reply('This is a simple help message.'));

    // This command will now reply with the message object it received
    bot.on('text', (ctx) => {
      // Log the specific context object from Telegraf
      console.log("Message from user:", ctx.message.from.username, "Text:", ctx.message.text);
      ctx.reply('You said: ' + ctx.message.text);
    });

    // Process the incoming update from Telegram
    await bot.handleUpdate(req.body, res);

  } catch (err) {
    // Log any errors that occur
    console.error('Error handling update:', err);
    // Send an error response back to Vercel
    res.status(500).send('Error processing update');
  }
};

module.exports = handler;
