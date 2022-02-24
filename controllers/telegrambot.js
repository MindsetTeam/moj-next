export const notifyTelegramBot = (req, res, next, route, userInfo = {}) => {
  let messageText = " ";
  if (!req) {
    messageText = `
User: ${userInfo.firstName + " " + userInfo.lastName} 
\r\n
path:${route.asPath}
    `;
  } else {
    const { user } = req;
    console.log(req);
    // path: ${encodeURI(req.url)}
    messageText = `
User: ${encodeURI(user.firstName.toString() + " " + user.lastName.toString())}
path: ${req.url}
method: ${req.method}
body:
${Object.entries(req.body)
  .join(
    `
`
  )
  .replaceAll(",", ": ")}
`;
  }
  fetch(
    `https://api.telegram.org/bot${process.env.tokenTelegramBot}/sendMessage?chat_id=-1001506706460&
    disable_notification=true&text=
${messageText}
    `
  ).catch(console.log);

  if (req) {
    next();
  }
  //     `https://api.telegram.org/bot${process.env.TOKEN_TELEGRAM_BOT}/sendMessage?chat_id=-1001506706460&parse_mode=MarkdownV2&text=${
  // user: CHUM SRUN
  // device: navigator.userAgent
  // details:

  //     }`
  //   );
  //   if(!route){
  //     next()
  //   };
};
