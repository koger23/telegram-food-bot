import { Scenes } from "telegraf";

export const wizard = new Scenes.WizardScene(
  "wizard",
  (ctx) => {
    ctx.reply("What's your name?");
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.data.name = ctx.message.text;
    ctx.reply("Enter your phone number");
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.data.phone = ctx.message.text;
    ctx.reply(`Your name is ${ctx.wizard.state.data.name}`);
    ctx.reply(`Your phone is ${ctx.wizard.state.data.phone}`);
    return ctx.scene.leave();
  }
);
