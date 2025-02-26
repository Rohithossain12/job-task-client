import { useDrag, useDrop } from "react-dnd";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { useState, useRef } from "react";

const TaskBoard = ({ task, refetch, index, moveTask }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id, index },
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

  // State for touch dragging
  const [touchStartY, setTouchStartY] = useState(null);
  const [touching, setTouching] = useState(false);

  // Handle touch start
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
    setTouching(true);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    if (!touching) return;
    const touchY = e.touches[0].clientY;
    const moveDistance = touchY - touchStartY;

    if (Math.abs(moveDistance) > 10) {
      ref.current.style.transform = `translateY(${moveDistance}px)`;
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setTouching(false);
    ref.current.style.transform = "translateY(0)";
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
        <button onClick={handleEdit}>
          <FaRegEdit size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskBoard;
