import { useEffect } from "react";
import "./styles.css";

type AnimatedDogProps = {
  onClick?: () => void;
};

export const AnimatedDog = ({ onClick }: AnimatedDogProps) => {
  useEffect(() => {
    const dogElement = document.getElementById("dog") as HTMLElement;
    dogElement.addEventListener("click", handleClick);

    const container = document.getElementById(
      "animated-container"
    ) as HTMLElement;

    function handleClick() {
      const heart = document.createElement("img");
      heart.setAttribute("height", "24px");
      heart.setAttribute("width", "24px");
      heart.setAttribute("src", "./heart.png");
      heart.classList.add("heart-fade-up");

      heart.addEventListener(
        "animationend",
        () => {
          heart.remove();
        },
        { once: true }
      );

      container.appendChild(heart);
    }

    return () => {
      dogElement.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div id="animated-container" className="flex justify-center w-full">
      <img
        id="dog"
        src="./dog.png"
        width="128px"
        height="128px"
        className="h-fit"
        onClick={onClick}
      />
    </div>
  );
};
