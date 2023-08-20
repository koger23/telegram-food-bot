import { Scenes } from "telegraf";
import NavCalendar from "telegram-inline-calendar";
import { validateStateData } from "./helpers";

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
      // Show calendar to select a day to plan
      ctx.wizard.state.data = {}; // init state
      if (calendar == null) {
        calendar = new NavCalendar(bot, calendarOptions);
      }
      calendar.startNavCalendar(ctx);

      return ctx.wizard.next();
    },
    (ctx) => {
      // Get selected day from calendar / callback query
      if (!calendar) {
        ctx.wizard.back();
      } else if (
        ctx.callbackQuery.message.message_id ==
        calendar.chats.get(ctx.callbackQuery.message.chat.id)
      ) {
        let res = calendar.clickButtonCalendar(ctx?.callbackQuery);

        if (res != null && res !== -1) {
          ctx.wizard.state.data.selectedDate = res;

          ctx.reply("You selected: " + res, {
            reply_markup: {
              inline_keyboard: [
                // Plan or edit a meal
                [
                  { text: "Breakfast", callback_data: "breakfast" },
                  { text: "Lunch", callback_data: "lunch" },
                  { text: "Dinner", callback_data: "dinner" },
                ],

                // List meals this day
                [{ text: "List all meals", callback_data: "list-all-meals" }],

                // step back to select another day
                [{ text: "Back", callback_data: "back" }],
              ],
            },
          });
          return ctx.wizard.next();
        }
      } else {
        ctx.wizard.back();
      }
    },
    (ctx) => {
      validateStateData(ctx);

      ctx.wizard.state.data.selectedMeal = ctx.callbackQuery.data;
      ctx.reply(`You selected: ${ctx.wizard.state.data.selectedMeal}`);
      ctx.sendMessage("Choose an option", {
        reply_markup: {
          inline_keyboard: [
            // Plan or edit a meal
            [
              { text: "Show", callback_data: "show" },
              { text: "Edit", callback_data: "edit" },
            ],

            // List meals this day
            [{ text: "List all meals", callback_data: "list-all-meals" }],

            // step back to select another day
            [{ text: "Back", callback_data: "back" }],
          ],
        },
      });

      return ctx.wizard.next();
    },
    (ctx) => {
      validateStateData(ctx);

      if (ctx.wizard.state.data.selectedMeal) {
        ctx.sendMessage("Choose an option", {
          reply_markup: {
            inline_keyboard: [
              // Plan or edit a meal
              [
                { text: "Show", callback_data: "show" },
                { text: "Edit", callback_data: "edit" },
              ],

              // List meals this day
              [{ text: "List all meals", callback_data: "list-all-meals" }],

              // step back to select another day
              [{ text: "Back", callback_data: "back" }],
            ],
          },
        });
      } else {
        ctx.wizard.back();
      }

      //return ctx.scene.leave();
    }
  );
