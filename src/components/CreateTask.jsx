import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const CreateTask = ({ refetch }) => {  
  const { users } = useAuth();
  const [task, setTask] = useState({
    name: "",
    description: "",
    status: "todo",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!task.name.length) {
      toast.error("Please enter a task name");
      return;
    } else if (task.name.length < 6) {
      toast.error("Task name must be at least 6 characters");
      return;
    } else if (task.name.length > 50) {
      toast.error("Task name cannot exceed 50 characters");
      return;
    }

    if (!task.description.length) {
      toast.error("Please enter Description");
      return;
    } else if (task.description.length > 200) {
      toast.error("Description cannot exceed 200 characters");
      return;
    }

    const taskData = {
      ...task,
      email: users.email,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/tasks",
        taskData
      );

      if (response.status === 201) {
        toast.success("Task added successfully");
        refetch();  
        setTask({ name: "", description: "", status: "todo" });
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto md:mt-5 mt-2 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-center text-gray-700">
        Create a New Task
      </h2>

      {/* Task Name */}
      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Task Name
        </label>
        <input
          type="text"
          className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task name"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
      </div>

      {/* Task Description */}
      <div>
        <label className="block text-gray-600 font-medium mb-1">
          Description
        </label>
        <textarea
          className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          placeholder="Enter task description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          rows="3"
        />
      </div>

      {/* Submit Button */}
      <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-md transition duration-300">
        Create Task
      </button>
    </form>
  );
};

export default CreateTask;
