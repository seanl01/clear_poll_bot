import TelegramBot, { Poll, Message } from "node-telegram-bot-api";

const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

// bot.onText(/\/start/, (msg: Message) => {
//   bot.sendMessage(msg.chat.id, "Send your poll!");

// bot.on("poll", async (poll: Poll) => {
//   const clearPoll = { ...poll };
//   await bot.sendPoll();
// })
// });

bot.on("poll", (poll: Poll) => {
  const chatId = poll.chat.id;
  const clearPoll = { ...poll.poll } as Poll;

  const pollOptions = clearPoll.options.map((option) => {
    return option.text
  });

  const { is_anonymous, type, allows_multiple_answers, correct_option, correct_option_id, explanation, explanation_parse_mode, open_period, close_date, is_closed } = clearPoll;

  const configOptions: SendPollOptions = {
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


interface SendPollOptions extends SendBasicOptions {
  is_anonymous?: boolean | undefined;
  type?: PollType | undefined;
  allows_multiple_answers?: boolean | undefined;
  correct_option_id?: number | undefined;
  explanation?: string | undefined;
  explanation_parse_mode?: ParseMode | undefined;
  open_period?: number | undefined;
  close_date?: number | undefined;
  is_closed?: boolean | undefined;
