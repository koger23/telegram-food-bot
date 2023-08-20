/**
 * Function to check if wizard has state data.
 * @param {Context<Update>} context
 * @returns
 */
export const validateStateData = (ctx) => {
  if (!ctx.wizard.state.data) {
    ctx.reply("Sorry, we lost your state, please start over.");

    return ctx.wizard.selectStep(0);
  }
}
