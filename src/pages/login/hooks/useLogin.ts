import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/auth/post/login/login";
import { useAuthStore } from "@/stores/useAuthStore";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: ({ token, user }) => {
      setToken(token);
      setUser(user);
      navigate("/home");
    },
  });

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return { form, onSubmit, isLoading: mutation.isPending, error: mutation.error };
};

export default useLogin;
