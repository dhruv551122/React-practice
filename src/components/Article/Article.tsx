import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import classes from "./Article.module.css";

function Article() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [contentArray, setContentArray] = useState<Element[]>([]);
  useEffect(() => {
    setContentArray(
      mainRef.current ? Array.from(mainRef.current.children) : []
    );
  }, []);
  return (
    <div className={classes.main}>
      <div className={classes.sidebar}>
        <Sidebar sideContent={contentArray} />
      </div>
      <div ref={mainRef} className={classes.content}>
        <h1 id="main-heading">Lorem ipsum dolor sit amet.</h1>
        <h2 id="heading-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h2>
        <h3 id="heading-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime totam
          odio dolorem! Autem laudantium, ea nesciunt nihil beatae, id obcaecati
          aperiam quia suscipit illo reiciendis. Ea unde atque repellat commodi.
          Iure hic quo sint ducimus alias nulla voluptates laborum asperiores
          adipisci recusandae? Repellat, magnam? Voluptatibus maxime ipsa dicta
          amet similique tempore quibusdam nobis! Quisquam animi dolores
          officiis corrupti accusantium cumque.
        </h3>
        <h3 id="heading-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime totam
          odio dolorem! Autem laudantium, ea nesciunt nihil beatae, id obcaecati
          aperiam quia suscipit illo reiciendis. Ea unde atque repellat commodi.
          Iure hic quo sint ducimus alias nulla voluptates laborum asperiores
          adipisci recusandae? Repellat, magnam? Voluptatibus maxime ipsa dicta
          amet similique tempore quibusdam nobis! Quisquam animi dolores
          officiis corrupti accusantium cumque.
        </h3>
        <h2 id="heading-5">Lorem ipsum dolor sit amet.</h2>
        <h3 id="heading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime totam
          odio dolorem! Autem laudantium, ea nesciunt nihil beatae, id obcaecati
          aperiam quia suscipit illo reiciendis. Ea unde atque repellat commodi.
          Iure hic quo sint ducimus alias nulla voluptates laborum asperiores
          adipisci recusandae? Repellat, magnam? Voluptatibus maxime ipsa dicta
          amet similique tempore quibusdam nobis! Quisquam animi dolores
          officiis corrupti accusantium cumque.
        </h3>
        <h2 id="heading-7">Lorem ipsum dolor sit amet.</h2>
        <h3>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, nemo eos
          quod quam vel in, est sit repellat possimus eius culpa perspiciatis
          illo necessitatibus exercitationem quos quibusdam adipisci fuga
          repellendus! Illum placeat quaerat corporis id nam odio quae vero
          dolorem debitis, eius possimus ex cumque aliquid dignissimos et ab?
          Nulla labore debitis sequi tempore quo delectus suscipit, deserunt
          optio explicabo.
        </h3>
        <h3 id="heading-8">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, nemo eos
          quod quam vel in, est sit repellat possimus eius culpa perspiciatis
          illo necessitatibus exercitationem quos quibusdam adipisci fuga
          repellendus! Illum placeat quaerat corporis id nam odio quae vero
          dolorem debitis, eius possimus ex cumque aliquid dignissimos et ab?
          Nulla labore debitis sequi tempore quo delectus suscipit, deserunt
          optio explicabo.
        </h3>
      </div>
    </div>
  );
}

export default Article;
