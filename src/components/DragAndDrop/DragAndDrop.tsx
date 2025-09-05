import { useRef, useState } from "react";
import classes from "./DragAndDrop.module.css";
import Tooltip from "../Modal/tooltip";
import DragContainer from "./DragContainer";

export type task = {
  id: number;
  content: string;
  location: "container1" | "container2";
};

export type container = { container1: task[]; container2: task[] };

function DragAndDrop() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<container>({
    container1: [],
    container2: [],
  });
  const draggedEleRef = useRef<HTMLLIElement>(null);
  console.log(tasks.container1.length, tasks.container2.length);
  return (
    <div>
      <Tooltip isOpen={isOpen} setIsOpen={setIsOpen} setTask={setTasks} />
      <button onClick={() => setIsOpen(true)}>Create Task</button>
      <div className={classes.draganddrop}>
        <DragContainer
          tasks={tasks.container1}
          setTask={setTasks}
          containerId="container1"
          draggedEleRef={draggedEleRef}
        />
        <DragContainer
          tasks={tasks.container2}
          setTask={setTasks}
          containerId="container2"
          draggedEleRef={draggedEleRef}
        />
      </div>
    </div>
  );
}

export default DragAndDrop;
