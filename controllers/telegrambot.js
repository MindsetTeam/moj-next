export const notifyTelegramBot = (req, res, next) => {
  fetch(
    `https://api.telegram.org/bot${process.env.TOKEN_TELEGRAM_BOT}/sendMessage?chat_id=-1001506706460&text=hi`
  );
  next();
};
