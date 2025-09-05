import { useEffect, useRef, useState } from "react";
import classes from "./MutationObserver.module.css";

function MutationObserverC() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [canShow, setCanShow] = useState<boolean>(false);
  const [colorChanged, setColorChanged] = useState<number>(0);
  const [color, setColor] = useState<string>("brown");
  const [childListData, setChildListData] = useState<
    {
      add: number;
      remove: number;
    }[]
  >([]);

  function handleClick() {
    setCanShow((prev) => !prev);
  }

  function handleColorChange() {
    setColor((prev) => (prev === "brown" ? "green" : "brown"));
  }

  useEffect(() => {
    const buttonEle = document.getElementById("button");
    const observer = new MutationObserver((mutation) => {
      const detail = { add: 0, remove: 0 };
      mutation.forEach((mutation) => {
        if (mutation.type === "attributes") {
          setColorChanged((prev) => prev + 1);
        }
        if (mutation.type === "childList") {
          console.log(mutation.addedNodes.length);
          if (mutation.addedNodes.length > 0) {
            detail.add++;
          }
          if (mutation.removedNodes.length > 0) {
            detail.remove++;
          }
        }
      });
      setChildListData((prev) => [...prev, detail]);
    });

    observer.observe(mainRef.current as HTMLElement, {
      childList: true,
      subtree: true,
    });
    observer.observe(buttonEle as HTMLElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={mainRef}>
        <button
          id="button"
          onClick={handleClick}
          className={`${classes.button} ${classes[color]}`}
        >
          {canShow ? "Remove Element" : "Add Element"}
        </button>
        <div>
          <h1>I'm {canShow ? "Visible" : "Hidden"}</h1>
          {canShow && (
            <>
              <button onClick={handleColorChange}>Change button color</button>
              <button onClick={handleClick}>Hide me</button>
            </>
          )}
        </div>
      </div>
      <p>Button color changed {colorChanged} time</p>
      {childListData.map((data) => (
        <div>
          {data.add > 0 && <p>{data.add} elements added</p>}
          {data.remove > 0 && <p>{data.remove} elements removed</p>}
        </div>
      ))}
    </>
  );
}

export default MutationObserverC;
