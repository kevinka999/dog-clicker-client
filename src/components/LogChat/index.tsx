import { useLayoutEffect } from "react";
import "./styles.css";

export const LogChat = ({ texts }: { texts: string[] }) => {
  useLayoutEffect(() => {
    scrollDown();

    function scrollDown() {
      const container = document.getElementById(
        "chat-container"
      ) as HTMLElement;
      container.scrollTop = container.scrollHeight;
    }
  }, [texts]);

  return (
    <div id="chat-container">
      <div className="flex flex-col">
        {texts.map((text, idx) => (
          <p key={idx} className="text-white">
            {text}
          </p>
        ))}
      </div>

      <div id="gradient"></div>
    </div>
  );
};
