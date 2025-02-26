import { useDrag, useDrop } from "react-dnd";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { useState, useRef } from "react";

const TaskBoard = ({ task, refetch, index, moveTask, status }) => {
  const ref = useRef(null);

  // Drag for Desktop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id, index, status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: "task",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  //  Touch Drag State
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touching, setTouching] = useState(false);
  const [currentSection, setCurrentSection] = useState(status);

  //  Handle Touch Start
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
    setTouchStartX(e.touches[0].clientX);
    setTouching(true);
  };

  //  Handle Touch Move
  const handleTouchMove = (e) => {
    if (!touching) return;
    const touchY = e.touches[0].clientY;
    const touchX = e.touches[0].clientX;

    // Move task visually
    ref.current.style.transform = `translate(${touchX - touchStartX}px, ${touchY - touchStartY}px)`;

    // Check which section task is over
    const elements = document.elementsFromPoint(touchX, touchY);
    const section = elements.find((el) => el.dataset.section);
    if (section) {
      setCurrentSection(section.dataset.section);
    }
  };

  //  Handle Touch End (Drop Task)
  const handleTouchEnd = async () => {
    setTouching(false);
    ref.current.style.transform = "translate(0,0)";

    if (currentSection !== status) {
      // If dropped in a different section, update status
      await axios.patch(`https://job-task-server-nine-black.vercel.app/tasks/${task._id}`, {
        status: currentSection,
      });
      toast.success("Task moved!");
      refetch();
    }
  };

  //  Handle Delete Task
  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div className="flex flex-col space-y-3">
          <p className="text-lg font-semibold">
            Are you sure you want to delete?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                deleteTask(id);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  //  Delete Task API Call
  const deleteTask = async (id) => {
    try {
      await toast.promise(
        axios.delete(`https://job-task-server-nine-black.vercel.app/tasks/${id}`),
        {
          loading: "Deleting task...",
          success: "Task deleted successfully!",
          error: "Failed to delete task.",
        }
      );
      refetch();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <div
      ref={ref}
      className={`relative p-5 mt-4 shadow-md rounded-md bg-white ${
        isDragging ? "opacity-25" : "opacity-100"
      } cursor-grab`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <p className="font-semibold text-gray-800 text-lg">{task?.name}</p>
      <p className="overflow-hidden text-gray-800">{task.description}</p>

      <div className="flex gap-4 absolute top-3 right-2 text-slate-500">
        <button onClick={() => handleDelete(task._id)}>
          <MdDeleteOutline size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskBoard;
