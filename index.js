const Telegraf = require("telegraf");
const Markup = require("telegraf/markup");
const config = require("./config.json");
const token = config.token;

const stepHandler = new Telegraf.Composer();
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

const superWizard = new Telegraf.Scenes.WizardScene(
  "super-wizard",
  (ctx) => {
    ctx.reply(
      "Step 1",
      Telegraf.Markup.inlineKeyboard([
        Telegraf.Markup.urlButton("❤️", "http://telegraf.js.org"),
        Telegraf.Markup.callbackButton("➡️ Next", "next"),
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

const bot = new Telegraf(token);
const stage = new Telegraf.Scenes.Stage([superWizard], { default: "super-wizard" });
bot.use(Telegraf.session());
bot.use(stage.middleware());
bot.launch();
