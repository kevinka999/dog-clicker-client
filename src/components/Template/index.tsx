import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Outlet } from "react-router-dom";

export const Template = () => {
  const [width, setWidth] = useState<number>(0);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("load", resize);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("load", resize);
      window.removeEventListener("resize", resize);
    };
  }, [rootRef]);

  function resize() {
    // @ts-ignore
    const width = rootRef?.current?.offsetWidth || 0;
    setWidth(width);
  }

  const mobileWidth = 640;

  return (
    <div ref={rootRef} className="dog-root">
      {width >= mobileWidth ? (
        <>
          <img src="./phone.png" className="middle-absolute phone-mockup" />
          <div className="middle-absolute phone-background" />
          <div className="middle-absolute phone-container">
            <div className="phone-subcontainer">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <div className="dog-container">
          <Outlet />
        </div>
      )}
    </div>
  );
};
