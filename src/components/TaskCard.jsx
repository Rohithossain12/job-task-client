import React from "react";
import DesignTaskCard from "./DesignTaskCard";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";
import axios from "axios";
import TaskBoard from "./TaskBoard";

const TaskCard = ({ status, refetch, todos, inProgress, done }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id, item.index),
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

  const addItemToSection = async (id, index) => {
    try {
      const response = await axios.patch(
        `https://job-task-server-nine-black.vercel.app/tasks/${id}`,
        { status: status, order: index }
      );

      if (response.data.modifiedCount > 0) {
        toast.success("Task Status Changed!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update task status.");
    }
  };

  // Handle task movement
  const moveTask = async (dragIndex, hoverIndex) => {
    const updatedTasks = [...tasksToMap];
    const draggedTask = updatedTasks.splice(dragIndex, 1)[0];
    updatedTasks.splice(hoverIndex, 0, draggedTask);

    // Update order in database
    try {
      await axios.patch(
        `https://job-task-server-nine-black.vercel.app/reorder`,
        {
          tasks: updatedTasks.map((task, index) => ({
            id: task._id,
            order: index,
          })),
        }
      );
      toast.success("Tasks reordered successfully!");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={drop}
      className={`w-full rounded-md ${isOver ? "bg-slate-200" : ""}`}
    >
      <DesignTaskCard text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task, index) => (
          <TaskBoard
            key={task._id}
            task={task}
            index={index}
            moveTask={moveTask}
            refetch={refetch}
          />
        ))}
    </div>
  );
};

export default TaskCard;
