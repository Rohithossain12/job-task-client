import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useTasks = () => {
  const { users } = useAuth();
  const email = users?.email;

 

  const {
    refetch,
    data: tasks = [],
    isLoading,
  } = useQuery({
    queryKey: ["tasks", email],
    queryFn: async () => {
      const res = await axios.get(`https://job-task-server-nine-black.vercel.app/tasks?email=${email}`);
      return res.data;
    },
  });

  return [tasks, refetch, isLoading];
};

export default useTasks;
