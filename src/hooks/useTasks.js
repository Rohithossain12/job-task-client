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
      const res = await axios.get(`http://localhost:5000/tasks?email=${email}`);
      return res.data;
    },
  });

  return [tasks, refetch, isLoading];
};

export default useTasks;
