import { Scenes } from "telegraf";
import NavCalendar from "telegram-inline-calendar";

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

let calendar = null;
const calendarOptions = {
  date_format: "YYYY-MM-DD",
  language: "en",
  bot_api: "telegraf",
};
export const mealPlannerWizard = (bot) =>
  new Scenes.WizardScene(
    "meal-planner-wizard",
    (ctx) => {
      console.log("STEP 1");
      if (calendar == null) {
        calendar = new NavCalendar(bot, calendarOptions);
      }
      calendar.startNavCalendar(ctx);

      return ctx.wizard.next();
    },
    (ctx) => {
      console.log("STEP 2");
      if (!calendar) {
        ctx.wizard.back();
      } else if (
        ctx.callbackQuery.message.message_id ==
        calendar.chats.get(ctx.callbackQuery.message.chat.id)
      ) {
        let res = ctx?.callbackQuery?.data;
        // ctx.wizard.state.data.selectedDate = ctx.callbackQuery.data;
        if (res != null && res !== -1) {
          ctx.reply("You selected: " + res);
          console.log(calendar.clickButtonCalendar(res));
          ctx.wizard.state.data.name = res;

          return ctx.wizard.next();
        }
      } else {
        ctx.wizard.back();
      }
    },
    (ctx) => {
      ctx.wizard.state.data.phone = ctx.message.text;
      ctx.reply(`Selected date is ${ctx.wizard.state.data.selectedDate}`);
      ctx.reply(`Your phone is ${ctx.wizard.state.data.phone}`);
      return ctx.scene.leave();
    }
  );
