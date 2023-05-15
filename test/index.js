const { Bot, session } = require("grammy");
const isBetween = require("dayjs/plugin/isBetween");
const dayjs = require("dayjs");
require("dayjs/locale/km");

const { Menu } = require("@grammyjs/menu");
const { FileAdapter } = require("@grammyjs/storage-file");
const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
dayjs.extend(isBetween);
const bot = new Bot("5712264437:AAEuPnZRtCcGF4MpmiW-23plL7XVCsy9v3g");
// const menuCancel = new Menu("cancel-menu").text("❌ Cancel", async (ctx) => {
//   // console.log(ctx);
//   await ctx.conversation.exit("");
//   await ctx.deleteMessage();
// });

bot.use(
  session({
    initial: () => ({
      meetings: [
        {
          title: "ស្តីពីការរៀបចំប្រព័ន្ធប្រជុំលើកទី១",
          leader: "ឆាយហេង",
          date: "2023-04-24T04:01:58.260Z",
          location: "សាលាក្រុងរាជធានីភ្នំពេញ",
        },
      ],
    }),
    storage: new FileAdapter({ dirName: "database" }),
  })
);
// bot.use(menu);
const menu = new Menu("delete-menu").text("❌ លុប", (ctx) => {
  const { session, msg } = ctx;
  const indexMeeting = session.meetings.findIndex(
    (v) => v.msg === msg.message_id
  );
  session.meetings.splice(indexMeeting, 1);
  ctx.deleteMessage();
});

const queryMeeting = (meetings, type = "today") => {
  let msgText = `កិច្ចប្រជុំមានចំនួន ## ក្នុងថ្ងៃនេះ

`;
  let startDate = dayjs().startOf("day");
  let endDate = dayjs().endOf("day");
  switch (type) {
    case "week":
      startDate = dayjs().startOf("week");
      endDate = dayjs().endOf("week");
      msgText = msgText.replace("ថ្ងៃ", "សប្តាហ៍");
      break;
    case "month":
      startDate = dayjs().startOf("month");
      endDate = dayjs().endOf("month");
      msgText = msgText.replace("ថ្ងៃ", "ខែ");
      break;
  }

  function formatMeetings(meeting) {
    return `📋កម្មវិធី: ស្តីពី${meeting.title}
👤ដឹកនាំដោយៈ ${meeting.leader}

📆${dayjs(meeting.date).locale("km").format(`ថ្ងៃdddd ទីDD ខែMMMM ឆ្នាំYYYY
ម៉ោង: hh:mmA`)}
📍${meeting.location}
─── ─── ─── ─── ───
`;
  }

  //   meeting.map((v) => {
  //     return `
  // 📋កម្មវិធី: ស្តីពី${v.title}
  // 👤ដឹកនាំដោយៈ ${v.leader}

  // 📆ថ្ងៃទី${v.date}
  // 📍${v.location}
  // `;
  //   }).join(`─── ─── ─── ─── ───
  // `);

  const filterMeetings = meetings
    .filter((v) => dayjs(v.date).isBetween(startDate, endDate))
    .sort((a, z) => new Date(a.date).getTime() - new Date(z.date).getTime());

  const countMeetings = filterMeetings.length;
  msgText += filterMeetings.map((meeting) => formatMeetings(meeting)).join("");

  return msgText.replace("##", countMeetings.toString().padStart(2, 0).replace('00','0'));
};

const reportMenu = new Menu("report-menu")
  .text("Month", (ctx) => {
    const meeting = queryMeeting(ctx.session.meetings, "month");

    ctx.reply(meeting, { parse_mode: "HTML" });
  })
  .text("Week", (ctx) => {
    const meeting = queryMeeting(ctx.session.meetings, "week");
    ctx.reply(meeting, { parse_mode: "HTML" });
  })
  .text("Today", (ctx) => {
    const meeting = queryMeeting(ctx.session.meetings);
    ctx.reply(meeting, { parse_mode: "HTML" });
  });

bot.use(reportMenu);
bot.use(menu);

bot.use(conversations());
bot.command("report", async (ctx) => {
  await ctx.reply("សូមធ្វើការជ្រើសរើស", { reply_markup: reportMenu });
});
bot.command("cancel", async (ctx) => {
  await ctx.conversation.exit();
  await ctx.reply("Leaving.");
});
bot.use(
  createConversation(async function addMeeting(conversation, ctx) {
    console.log(ctx.msg, ctx.from);
    await ctx.reply(
      `សូមធ្វើការបំពេញ:
កម្មវត្ថុ
កាលបរិច្ឆេទ
ដឹកនាំ
ទីតាំង`,
      {
        parse_mode: "HTML",
        reply_to_message_id: ctx.msg.message_id,
        // message_thread_id: ctx.msg.message_thread_id,
      }
    );
    const titleCtx = await conversation.waitFrom(ctx.from.id);
    const dateCtx = await conversation.waitFrom(ctx.from.id);
    const leaderCtx = await conversation.waitFrom(ctx.from.id);
    const locationCtx = await conversation.waitFrom(ctx.from.id);
    const msg = await ctx.reply(
      `កម្មវត្ថុ: ${titleCtx.msg.text}
កាលបរិច្ឆេទ: ${new Date(dateCtx.msg.text)}
ដឹកនាំ: ${leaderCtx.msg.text}
ទីតាំង: ${locationCtx.msg.text}`,
      { reply_markup: menu, message_thread_id: ctx.msg.message_thread_id }
    );
    const meeting = {
      msg: msg.message_id,
      title: titleCtx.msg.text,
      date: new Date(dateCtx.msg.text),
      leader: leaderCtx.msg.text,
      location: locationCtx.msg.text,
    };
    await conversation.session.meetings.unshift(meeting);
    return;
  })
);

const isAddMeetingsGroup = (ctx) => {
  return ctx.chat.id == -1001777934238 && ctx.msg.message_thread_id == 3;
};
bot.command("add").filter(isAddMeetingsGroup, async (ctx) => {
  await ctx.conversation.enter("addMeeting");
});

bot.on("message", (ctx) =>
  ctx.reply(
    dayjs().format(`ថ្ងៃdddd ទីD ខែMMMM ឆ្នាំYYYY
ម៉ោង: HH:mm
`)
  )
);
bot.catch((err) => {
  console.log(err);
});

bot.start();
