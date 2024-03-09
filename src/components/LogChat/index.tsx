import { useLayoutEffect } from "react";
import "./styles.css";

export const LogChat = ({ texts }: { texts: string[] }) => {
  useLayoutEffect(() => {
    scrollDown();

    function scrollDown() {
      const chat = document.getElementById("chat") as HTMLElement;
      chat.scrollTop = chat.scrollHeight;
    }
  }, [texts]);

  return (
    <div className="chat-container">
      <div id="chat">
        {texts.map((text, idx) => (
          <p key={idx} className="text-white">
            {text}
          </p>
        ))}
      </div>

      <div className="chat-overlay"></div>
    </div>
  );
};
