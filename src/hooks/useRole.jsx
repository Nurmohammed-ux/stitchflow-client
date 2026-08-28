import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";


const useRole = () => {
  const axios = useAxios();
  const { user } = useAuth(); 

  const { data: roleData, isLoading: isRoleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/users/${user.email}/role`);
      return res.data;
    },
  });

  return { role: roleData?.role, isRoleLoading };
};

export default useRole;