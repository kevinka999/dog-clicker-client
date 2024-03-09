import { useEffect } from "react";
import "./styles.css";

type ProgressBarProps = {
  percent: number;
};

export const ProgressBar = ({ percent }: ProgressBarProps) => {
  useEffect(() => {
    const progressBarElement = document.getElementById(
      "progress-bar"
    ) as HTMLElement;

    progressBarElement.style.width = `${percent}%`;
  }, [percent]);

  return (
    <div className="border border-solid border-green-500 w-full h-3">
      <div id="progress-bar" className="h-full animated-progress"></div>
    </div>
  );
};
