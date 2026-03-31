export const queryKeys = {
  user: {
    all: () => ["user"] as const,
    detail: (id: string) => ["user", id] as const,
  },
  auth: {
    all: () => ["auth"] as const,
  },
} as const;
