import { client } from "@/api/client";
import type { GetUserRequest, GetUserResponse } from "./getUser.interface";

const USE_STUB = import.meta.env.VITE_USE_STUB === "true";

export const getUser = async (
  params: GetUserRequest
): Promise<GetUserResponse> => {
  if (USE_STUB) return stub(params);
  return api(params);
};

const api = async ({ id }: GetUserRequest): Promise<GetUserResponse> => {
  const { data } = await client.get<GetUserResponse>(`/users/${id}`);
  return data;
};

const stub = async (_params: GetUserRequest): Promise<GetUserResponse> => {
  return {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  };
};
