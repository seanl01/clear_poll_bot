import TelegramBot from "node-telegram-bot-api";
const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });
// bot.onText(/\/start/, (msg: Message) => {
//   bot.sendMessage(msg.chat.id, "Send your poll!");
// bot.on("poll", async (poll: Poll) => {
//   const clearPoll = { ...poll };
//   await bot.sendPoll();
// })
// });
bot.on("poll", (poll) => {
    const chatId = poll.chat.id;
    const clearPoll = Object.assign({}, poll.poll);
    const pollOptions = clearPoll.options.map((option) => {
        return option.text;
    });
    const { is_anonymous, type, allows_multiple_answers, correct_option, correct_option_id, explanation, explanation_parse_mode, open_period, close_date, is_closed } = clearPoll;
    const configOptions = {
        is_anonymous,
        type,
        allows_multiple_answers,
        correct_option_id,
        explanation,
        explanation_parse_mode,
        open_period,
        close_date,
        is_closed,
    };
    bot.sendPoll(chatId, clearPoll.question, pollOptions, configOptions);
});
