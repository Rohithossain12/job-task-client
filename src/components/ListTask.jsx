import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

const ListTask = ({ tasks, refetch }) => {  
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fDone = tasks.filter((task) => task.status === "done");
    setTodos(fTodos);
    setInProgress(fInProgress);
    setDone(fDone);
  }, [tasks]); 

  const statuses = ["todo", "inprogress", "done"];

  return (
    <div className="grid grid-cols-1 w-full h-auto md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 p-4 md:p-6 lg:p-8">
      {statuses.map((status, index) => (
        <TaskCard
          key={index}
          status={status}
          tasks={tasks}
          refetch={refetch}  
          todos={todos}
          inProgress={inProgress}
          done={done}
        />
      ))}
    </div>
  );
};

export default ListTask;
