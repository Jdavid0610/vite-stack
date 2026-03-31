import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user/get/getUser/getUser";
import { queryKeys } from "@/api/queryKeys";
import useAuth from "@/hooks/auth/useAuth";

const useHome = () => {
  const { user } = useAuth();

  const userQuery = useQuery({
    queryKey: queryKeys.user.detail(user?.id ?? ""),
    queryFn: () => getUser({ id: user?.id ?? "" }),
    enabled: !!user?.id,
  });

  return { userQuery };
};

export default useHome;
