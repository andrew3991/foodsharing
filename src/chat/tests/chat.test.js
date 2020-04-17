const knex = require("knex");
const mockDb = require("mock-knex");
const db = knex({
  client: "sqlite"
});

const chat = require("../chat");
const chat_user = require("../utils/chat_user");

mockDb.mock(db);

test("should return uri with length 15", () => {
  expect(chat.createChatURI("3fd1aed4-df90-4021-8241-658766c15fcc")).toBe(
    "3fd1aed4df90402"
  );
});

test("tests error: Message should be not empty line", () => {
  const message = "";
  return chat
    .validateChatData(message)
    .catch(e =>
      expect(e).toEqual(
        new Error("You are trying send empty string. Please enter a message!")
      )
    );
});
test("tests error: Message should be not longer than 256", () => {
  const message =
    "Anna: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanc";

  return chat
    .validateChatData(message)
    .catch(e => expect(e).toEqual(new Error("Message is to long")));
});

test("List of arrays should be an array", () => {
  let render = "";
  const req = {
    user: { id: 1 }
  };
  const res = {
    render: route => {
      render = route;
    }
  };

  expect(chat.listAllChats(req, res)).toEqual([]);
});

// test("should call res.render with views/partials/list_food and foodRows", done => {
//   let render = "";

//   const session = {
//     id: 1,
//     uri: "frkdu578fj49fj4",
//     created_at: "2020-01-07 14:34:53",
//     owner: 1,
//     member: 2
//   };

//   const req = {
//     //body: session,
//     user: { id: 1 },
//     query: { receiver_id: 2 }
//   };

//   const res = {
//     render: route => {
//       render = route;
//     }
//   };

//   // mock knex connection
//   const tracker = mockDb.getTracker();
//   tracker.install();
//   tracker.on("query", query => {
//     query.response([{}]);
//   });

//   db.table("query").then(() => {
//     tracker.uninstall();
//     done();
//   });

//   // chat.createChatSession(req, res).then(() => {
//   //   expect(res.render).toEqual("views/partials/chat_session");
//   // });
//   chat.createChatSession(req, res);
//   expect(render).toEqual("views/partials/chat_session");
// });
