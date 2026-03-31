import { client } from "@/api/client";
import type { LoginRequest, LoginResponse } from "./login.interface";

const USE_STUB = import.meta.env.VITE_USE_STUB === "true";

export const login = async (params: LoginRequest): Promise<LoginResponse> => {
  if (USE_STUB) return stub(params);
  return api(params);
};

const api = async (params: LoginRequest): Promise<LoginResponse> => {
  const { data } = await client.post<LoginResponse>("/auth/login", params);
  return data;
};

const stub = async (_params: LoginRequest): Promise<LoginResponse> => {
  return {
    token: "stub-jwt-token",
    user: {
      id: "1",
      name: "John Doe",
      email: _params.email,
    },
  };
};
