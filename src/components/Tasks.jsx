import CreateTask from "./CreateTask";
import ListTask from "./ListTask";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useTasks from "../hooks/useTasks";

const Tasks = () => {
  const [tasks, refetch, isLoading] = useTasks();
  const { loading } = useAuth();

  if (isLoading || loading) return <LoadingSpinner />;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-slate-100 rounded-lg flex flex-col pt-5 px-3 pb-5 space-y-5 py-5 items-center mb-10">
        <CreateTask tasks={tasks} refetch={refetch} />
        <ListTask tasks={tasks} refetch={refetch} />
      </div>
    </DndProvider>
  );
};

export default Tasks;
