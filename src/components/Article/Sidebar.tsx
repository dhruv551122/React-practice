import { HashLink } from "react-router-hash-link";
import classes from "./Sidebar.module.css";

const tags = ["H1", "H2", "H3"];

function Sidebar({ sideContent }: { sideContent: Element[] }) {
  console.log(sideContent[0]);
  return (
    <div className={classes.sidebar}>
      <ul>
        {sideContent.map((item, index) => {
          if (tags.includes(item.tagName)) {
            return (
              <HashLink
                smooth
                to={`#${item.id}`}
                key={index}
                className={classes[item.tagName]}
              >
                {item.textContent}
              </HashLink>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
