import { MessageProps, Message } from "./components/Message";

import closeIcon from "./assets/images/close.svg";
import sendIcon from "./assets/images/send.svg";
import avatarImage from "./assets/images/avatar.png";

import { FormEvent, useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState<MessageProps[]>();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-[#010217] text-white h-screen px-12 py-12 flex flex-col justify-between">
      <header>
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <img className="w-16 h-16" src={avatarImage} alt="" />
            <div>
              <h4>Cecilia Sassaki</h4>
              <span className="text-sm text-green-500 before:inline-block before:content-[''] before:bg-green-500 before:my-px before:mr-1.5 before:h-1.5 before:w-1.5 before:rounded-full">
                Online
              </span>
            </div>
          </div>
          <button>
            <img src={closeIcon} alt="" />
          </button>
        </div>
        <p className="text-center text-white/60 text-sm mt-4">
          Hoje {new Date().getHours()}:{new Date().getMinutes()}
        </p>
      </header>
      <main className="py-4 justify-end h-full my-8 overflow-scroll">
        <div className="flex flex-col gap-4">
          {messages &&
            messages.map((message) => {
              return (
                <Message
                  key={messages.indexOf(message)}
                  isSended={message.isSended}
                  senderName={message.senderName}
                  timeStamp={message.timeStamp}
                  content={message.content}
                />
              );
            })}
        </div>
      </main>
      <footer>
        <form
          className="bg-white/20 flex p-2.5 rounded-lg"
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            let newMessage: MessageProps = {
              isSended: false,
              content: "",
              timeStamp: "",
              senderName: "",
            };
            if (inputRef.current && inputRef.current.value) {
              newMessage.content = inputRef.current.value;
            } else {
              return;
            }
            newMessage.timeStamp = `${new Date().getHours()}:${new Date()
              .getMinutes()
              .toString()
              .padStart(2, "0")}`;
            newMessage.isSended = true;
            newMessage.senderName = "Jui e Tots";
            if (messages) setMessages([...messages, newMessage]);
            else setMessages([newMessage]);
            inputRef.current.value = "";
          }}
        >
          <input
            className="placeholder:text-white/70 bg-transparent outline-none w-full px-2 py-4"
            placeholder="Digite uma mensagem..."
            type="text"
            ref={inputRef}
          />
          <button type="submit" className="p-2 outline-none">
            <img src={sendIcon} alt="" />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;
