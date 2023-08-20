import { Scenes, session, Telegraf } from "telegraf";
import { Secrets } from "./secrets.js";
import { wizard, mealPlannerWizard } from "./utils/scenes.js";

const bot = new Telegraf(Secrets.TELEGRAM_BOT_TOKEN);
const stage = new Scenes.Stage([wizard, mealPlannerWizard(bot)]);

bot.use(session());
bot.use(stage.middleware());

bot.command("id", (ctx) => {
  ctx.scene.enter("wizard");
});
bot.hears("*", (ctx) => ctx.reply("Hey there"));

bot.command("start", (ctx) => {
  const chatId = ctx.chat.id;
  ctx.scene.enter('meal-planner-wizard', chatId);
});

bot.use((ctx, next) => {
  const message = ctx?.message;
  const userId = message?.from?.id;
  const text = message?.text;
  // Check if the message is a command (starts with a slash)
  if (text && !text.startsWith("/")) {
    // Process the message or perform any desired actions here
    // For demonstration purposes, let's just echo the message back to the user
    ctx.reply(`You said: ${text}`);
  }
  // Call the next middleware
  return next();
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));