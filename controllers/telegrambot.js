import DeviceDetector from "device-detector-js";

export const notifyTelegramBot = (req, res, next, route, userInfo = {}) => {
  const deviceDetector = new DeviceDetector();

  let messageText = " ";
  if (!req) {
    messageText = `
User: ${userInfo.firstName + " " + userInfo.lastName}
path:${route.asPath}
    `;
  } else {
    const { user } = req;
    const ipAddress =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress ||
      null;
    const userAgent = req.headers["user-agent"];
    const device = deviceDetector.parse(userAgent);
    console.log(device);
    messageText = `
User: ${(user.firstName || "") + " " + (user.lastName || "")}
IP: ${ipAddress}
path: ${req.url}
method: ${req.method}
device: ${Object.values(device?.os)}
body:
${Object.entries(req.body)
  .join(
    `
`
  )
  .replaceAll(",", ": ")}
`;
  }
  // fetch(
  //   `https://api.telegram.org/bot${process.env.tokenTelegramBot}/sendMessage`,
  //   {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       text: messageText,
  //       disable_notification: false,
  //       chat_id: -1001506706460,
  //     }),
  //   }
  // ).catch(console.log);  

  if (req) {
    next();
  }
};
