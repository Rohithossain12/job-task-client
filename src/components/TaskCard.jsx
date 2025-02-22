import React from "react";
import DesignTaskCard from "./DesignTaskCard";
import TodoTask from "./TodoTask";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";
import axios from "axios";

const TaskCard = ({ status, tasks, refetch, todos, inProgress, done }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "To-Do";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }
  if (status === "done") {
    text = "Done";
    bg = "bg-green-500";
    tasksToMap = done;
  }

  const addItemToSection = async (id) => {
    try {
      const response = await axios.patch(`https://job-task-server-nine-black.vercel.app/tasks/${id}`, {
        status: status,
      });

      if (response.data.modifiedCount > 0) {
        toast.success("Task Status Changed!");

        refetch();
      }
    } catch (error) {
      toast.error("Failed to update task status.");
    }
  };

  return (
    <div
      ref={drop}
      className={`w-full rounded-md ${isOver ? "bg-slate-200" : ""}`}
    >
      <DesignTaskCard text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <TodoTask
            key={task._id}
            task={task}
            tasks={tasks}
            refetch={refetch}
          />
        ))}
    </div>
  );
};

export default TaskCard;
