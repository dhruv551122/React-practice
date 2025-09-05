import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./ReactBoundingClientRect.module.css";
const clickableButtons = ["Home", "Learn", "Earn"];
const nonClickableButton = ["About Us", "Blogs", "Create Account", "Sign In"];

function ReactBoundingClientRect() {
  const [canShow, setCanShow] = useState<boolean>(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const dorpdownRef = useRef<HTMLUListElement>(null);

  const handleOutsideClick = useCallback((e) => {
    if (!mainRef.current?.contains(e.target)) {
      setCanShow(false);
    }
  }, []);

  useEffect(() => {
    if (mainRef.current && dorpdownRef.current) {
      const rect = mainRef.current.getBoundingClientRect();
      const dropdownWidth = dorpdownRef.current?.clientWidth;
      const dropdownHeight = dorpdownRef.current?.clientHeight;
      if (window.innerWidth - rect.left < dropdownWidth) {
        dorpdownRef.current.style.right = "0px";
      }
      if (rect.top >= dropdownHeight) {
        dorpdownRef.current.style.bottom = `${rect.height}px`;
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [canShow, handleOutsideClick]);

  return (
    <>
      <div className={classes.main} ref={mainRef}>
        <button
          onClick={() => setCanShow((prev) => !prev)}
          className={classes.modalButton}
        >
          {canShow ? "Close" : "Open"}
        </button>
        {canShow && (
          <ul className={classes.dropdown} ref={dorpdownRef}>
            {clickableButtons.map((button) => (
              <li key={button} onClick={() => setCanShow(false)}>
                {button}
              </li>
            ))}
            <div className={classes.devider}></div>
            {nonClickableButton.map((button) => (
              <li key={button}>{button}</li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={(e) => e.stopPropagation()}>Can't Close</button>
    </>
  );
}

export default ReactBoundingClientRect;
