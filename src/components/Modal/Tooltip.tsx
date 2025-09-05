import type { Dispatch, SetStateAction } from "react";
import type { container, task } from "../DragAndDrop/DragAndDrop";
import Modal from "./Modal";
import classes from "./Tooltip.module.css";

function Tooltip({
  isOpen,
  setIsOpen,
  setTask,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setTask: Dispatch<SetStateAction<container>>;
}) {
  function handleSubmit(formData: FormData) {
    const userInput = formData.get("task");
    if (typeof userInput === "string") {
      const task: task = {
        id: Date.now(),
        content: userInput,
        location: "container1",
      };
      setTask((prev) => {
        return { ...prev, container1: [...prev.container1, task] };
      });
    }
    setIsOpen(false);
  }
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={classes.main}>
          <form action={handleSubmit}>
            <label>
              <span>Enter Task</span>
              <input type="text" name="task" required />
            </label>
            <div className={classes.buttons}>
              <button className={classes.submitButton}>Submit</button>
              <button
                type="button"
                className={classes.closeButton}
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Tooltip;
