export const notifyTelegramBot = (req, res, next, route, userInfo = {}) => {
  let messageText = " ";
  if (!req) {
    messageText = `
User: ${userInfo.firstName + " " + userInfo.lastName}
path:${route.asPath}
    `;
  } else {
    const { user } = req;
    console.log(req);
    // path: ${encodeURI(req.url)}
    messageText = `
User: ${(user.firstName || "") + " " + (user.lastName || "")}
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
    `https://api.telegram.org/bot${process.env.tokenTelegramBot}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: messageText,
        chat_id: -1001506706460,
      }),
    }
  ).catch(console.log);

  if (req) {
    next();
  }
};
