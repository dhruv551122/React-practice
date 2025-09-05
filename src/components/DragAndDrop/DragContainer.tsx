import { useRef, useState } from "react";
import type { container, task } from "./DragAndDrop";
import classes from "./DragContainer.module.css";

type mainType = {
  tasks: task[];
  setTask: React.Dispatch<React.SetStateAction<container>>;
  containerId: "container1" | "container2";
  draggedEleRef: { current: HTMLLIElement | null };
};

function DragContainer({
  tasks,
  setTask,
  draggedEleRef,
  containerId,
}: mainType) {
  const mainRef = useRef<HTMLDivElement>(null);
  const [dragEntered, setDragEntered] = useState<boolean>(false);
  const prevDragOverRef = useRef<HTMLLIElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const indexRef = useRef<number | null>(0);

  function handleDragStart(e: React.DragEvent<HTMLLIElement>, id: number) {
    const data: { id: number; containerId: "container1" | "container2" } = {
      id,
      containerId,
    };
    e.dataTransfer.setData("json", JSON.stringify(data));
    draggedEleRef.current = e.target as HTMLLIElement;
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    const data = JSON.parse(e.dataTransfer.getData("json"));
    if (indexRef.current !== null) {
      setTask((prev: container) => {
        const copiedData = JSON.parse(JSON.stringify(prev)) as container;

        const targetTaskIndex = copiedData[
          data.containerId as keyof container
        ].findIndex((task: task) => task.id === data.id);
        const [splicedTask] = copiedData[
          data.containerId as keyof container
        ].splice(targetTaskIndex, 1);
        copiedData[containerId].splice(indexRef.current!, 0, splicedTask);

        return {
          container1: copiedData.container1,
          container2: copiedData.container2,
        };
      });
    }

    if (prevDragOverRef.current) {
      prevDragOverRef.current.style.marginTop = "0px";
    }

    indexRef.current = null;
    setDragEntered(false);
  }

  function handelDragEnter(e: React.DragEvent<HTMLDivElement>) {
    setDragEntered(true);
    if (e.target === mainRef.current) {
      indexRef.current = tasks.length;
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    if (!mainRef.current?.contains(e.relatedTarget as Node)) {
      setDragEntered(false);
      if (prevDragOverRef.current) {
        console.log("decrease leave");
        prevDragOverRef.current.style.marginTop = "0px";
      }
    }
    if (!ulRef.current?.contains(e.relatedTarget as Node)) {
      if (prevDragOverRef.current) {
        console.log("decrease leave 2");
        prevDragOverRef.current.style.marginTop = "0px";
        indexRef.current = tasks.length;
      }
    }
  }

  function handleDragOverOnTask(e: React.DragEvent<HTMLLIElement>) {
    if (prevDragOverRef.current) {
      console.log("decrease ");
      prevDragOverRef.current.style.marginTop = "0px";
    }

    const childNodes = Array.from(ulRef.current?.children || []);
    const draggedEleIndex = childNodes.findIndex(
      (item) => item === draggedEleRef.current
    );

    if (
      e.target !== draggedEleRef.current &&
      (e.target !== childNodes[draggedEleIndex + 1] || draggedEleIndex === -1)
    ) {
      console.log("increase");
      (
        e.target as HTMLElement
      ).style.marginTop = `${draggedEleRef.current?.clientHeight}px`;
      indexRef.current = +(e.target as HTMLElement).dataset.index!;
      prevDragOverRef.current = e.target as HTMLLIElement;
    } else {
      if (draggedEleRef.current) {
        indexRef.current = null;
      }
    }
  }

  return (
    <div
      className={`${classes.container} ${
        dragEntered ? classes.dragEntered : ""
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handelDragEnter}
      onDragLeave={handleDragLeave}
      ref={mainRef}
    >
      <ul ref={ulRef}>
        {tasks.length === 0 ? (
          <li>No task added to this container</li>
        ) : (
          tasks.map((task, index) => {
            return (
              <li
                data-index={index}
                key={task.id}
                draggable
                onDragStart={(e: React.DragEvent<HTMLLIElement>) =>
                  handleDragStart(e, task.id)
                }
                onDragOver={handleDragOverOnTask}
              >
                {task.content}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default DragContainer;
