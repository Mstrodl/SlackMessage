import {SlackMessage} from "@/SlackMessage.jsx";
import ReactDOM from "react-dom";

import sampleMessage6 from "./message6.json";
import sampleMessage5 from "./message5.json";
import sampleMessage4 from "./message4.json";
import sampleMessage3 from "./message3.json";
import sampleMessage2 from "./message2.json";
import sampleMessage from "./message.json";

const messages = [
  sampleMessage5,
  sampleMessage4,
  sampleMessage3,
  sampleMessage2,
  sampleMessage,
];

const child = document.createElement("div");
document.body.appendChild(child);
ReactDOM.render(<App />, child);

function App() {
  const context = {
    getUser(id) {
      return new Promise(() => {});
    },
    getGroup(id) {
      return new Promise(() => {});
    },
    getChannel(id) {
      return new Promise(() => {});
    },
    workspaceEmoji: {},
  };

  return messages.map((message) => (
    <SlackMessage {...message} context={context} key={message.ts} />
  ));
}
