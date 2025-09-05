import { useEffect, useRef, useState } from "react";
import classes from "./ResizeObserverC.module.css";
const actions: string[] = [
  "Edit",
  "Save",
  "Update",
  "Delete",
  "Open",
  "Close",
  "Upload",
  "Verify",
];

function ResizeObserverC() {
  const [mainActions, setMainActions] = useState<string[]>([...actions]);
  const [canShow, setCanShow] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const parent = parentRef.current as HTMLDivElement;
      const parentScrollWidth = entry.target.scrollWidth;
      const parentOffsetWidth = parent.offsetWidth;
      if (parentScrollWidth > parentOffsetWidth) {
        setMainActions((prev) => prev.slice(0, prev.length - 1));
      }
    });

    if (parentRef.current) {
      observer.observe(parentRef.current);
    }

    return () => observer.disconnect();
  }, [mainActions]);

  return (
    <>
      <div id="parent" ref={parentRef} className={classes.main}>
        {mainActions.map((action) => (
          <button key={action}>{action}</button>
        ))}
        {mainActions.length < actions.length && (
          <button onClick={() => setCanShow((prev) => !prev)}>...</button>
        )}
      </div>
      {canShow && (
        <div className={classes.dropdown}>
          {actions
            .slice(mainActions.length, actions.length) // i dont want to use this
            .map((action) => (
              <button key={action}>{action}</button>
            ))}
        </div>
      )}
    </>
  );
}

export default ResizeObserverC;
