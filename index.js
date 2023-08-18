import { Scenes, session, Telegraf } from "telegraf";
import { Secrets } from "./secrets.js";
import { wizard } from "./scenes.js";

const stage = new Scenes.Stage([wizard]);
const bot = new Telegraf(Secrets.TELEGRAM_BOT_TOKEN);
bot.use(session());
bot.use(stage.middleware());
bot.command("id", (ctx) => {
  ctx.scene.enter("wizard");
});
bot.launch();
