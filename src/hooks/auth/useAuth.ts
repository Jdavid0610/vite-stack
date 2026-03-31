import { useAuthStore } from "@/stores/useAuthStore";

const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  return { user, token, logout };
};

export default useAuth;
