import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./InterSectionObserver.module.css";
import { Link } from "react-router-dom";

function InterSectionObserver() {
  const [feedArray, setFeedArray] = useState<number[]>(
    Array.from({ length: 10 })
  );
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const addFeeds = useCallback(
    (num: number) => {
      setFeedArray((prev) => Array.from({ length: prev.length + num }));
    },
    [setFeedArray]
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      console.log(entries);
      if (entries[0].isIntersecting) {
        addFeeds(10);
      }
    });

    const observeEle: Element | undefined =
      mainRef.current?.children[mainRef.current?.children.length - 2];
    if (observeEle) {
      observer.observe(observeEle);
    }

    return () => observer.disconnect();
  }, [feedArray.length, addFeeds]);

  return (
    <div>
      <Link to="mutation-observer" className={classes.link}>
        Go to Mutation Observer Ex
      </Link>
      <div className={classes.main} ref={mainRef}>
        {feedArray.map((_, index) => (
          <div key={index} className={classes.feed}>
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterSectionObserver;
