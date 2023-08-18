import { Composer, Scenes, Markup, session, Telegraf } from "telegraf";
import { TELEGRAM_BOT_TOKEN } from "./secrets.js";

const stepHandler = new Composer();
stepHandler.action("next", (ctx) => {
  ctx.reply("Step 2. Via inline button");
  return ctx.wizard.next();
});
stepHandler.command("next", (ctx) => {
  ctx.reply("Step 2. Via command");
  return ctx.wizard.next();
});
stepHandler.use((ctx) =>
  ctx.replyWithMarkdown("Press `Next` button or type /next")
);

const superWizard = new Scenes.WizardScene(
  "super-wizard",
  (ctx) => {
    ctx.reply(
      "Step 1",
      Markup.inlineKeyboard([
        Markup.urlButton("❤️", "http://telegraf.js.org"),
        Markup.callbackButton("➡️ Next", "next"),
      ]).extra()
    );
    return ctx.wizard.next();
  },
  stepHandler,
  (ctx) => {
    ctx.reply("Step 3");
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.reply("Step 4");
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.reply("Done");
    return ctx.scene.leave();
  }
);

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
const stage = new Scenes.Stage([superWizard], { default: "super-wizard" });
bot.use(session());
bot.use(stage.middleware());
bot.command('/id', ctx => {
  ctx.scene.enter('super-wizard');
});
bot.launch();
