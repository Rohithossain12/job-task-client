import { useDrag } from "react-dnd";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

const TodoTask = ({ task, refetch }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // State for editing task
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: task.name,
    description: task.description,
  });

  // Handle Delete Confirmation
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

  // Delete Task API Call
  const deleteTask = async (id) => {
    try {
      await toast.promise(axios.delete(`https://job-task-server-nine-black.vercel.app/tasks/${id}`), {
        loading: "Deleting task...",
        success: "Task deleted successfully!",
        error: "Failed to delete task.",
      });
      refetch();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // Handle Edit Click
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle Edit Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  // Handle Update API Call
  const handleUpdate = async () => {
    try {
      await toast.promise(
        axios.put(`https://job-task-server-nine-black.vercel.app/tasks/${task._id}`, editedTask),
        {
          loading: "Updating task...",
          success: "Task updated successfully!",
          error: "Failed to update task.",
        }
      );
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <div
      ref={drag}
      className={`relative p-5 mt-4 shadow-md rounded-md bg-white ${
        isDragging ? "opacity-25" : "opacity-100"
      } cursor-grab`}
    >
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleInputChange}
            className="w-full border p-2 text-gray-800 rounded-md"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            className="w-full border p-2 text-gray-800 rounded-md"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default TodoTask;
