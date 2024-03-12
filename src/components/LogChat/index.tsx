import { useLayoutEffect } from "react";
import "./styles.css";

export const LogChat = ({ chat }: { chat: string[] }) => {
  useLayoutEffect(() => {
    scrollDown();

    function scrollDown() {
      const chat = document.getElementById("chat") as HTMLElement;
      chat.scrollTop = chat.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="chat-container">
      <div id="chat">
        {chat.map((message, idx) => (
          <p key={idx} className="text-white">
            {message}
          </p>
        ))}
      </div>

      <div className="chat-overlay"></div>
    </div>
  );
};
