# Project Patterns & Conventions

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** — styling
- **React Router DOM** — routing
- **Zustand** — client state management
- **TanStack React Query** — server state / data fetching
- **React Hook Form** + **Zod** — forms and validation
- **Axios** — HTTP client

---

## Component Pattern

Each component lives in its own folder:

```
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.interface.ts
  hooks/                    # only if needed
    useComponentName.ts
```

**Rules:**
- Export the component as default from `ComponentName.tsx`
- Props interface goes in `ComponentName.interface.ts`
- Component-scoped logic goes in `hooks/useComponentName.ts`

---

## Page Pattern

Each page lives under `src/pages/`:

```
src/pages/pageName/
  index.tsx                 # page UI only
  hooks/
    usePageName.ts          # ALL logic: forms, methods, validations, requests
  components/               # only for components exclusive to this page
    ComponentName/
      ComponentName.tsx
      ComponentName.interface.ts
      hooks/
        useComponentName.ts
```

**Rules:**
- `index.tsx` is UI only — no business logic, no direct API calls
- All logic lives in `hooks/usePageName.ts`: forms, mutations, queries, handlers
- Page-specific components follow the same component pattern

---

## API Pattern

All API calls live under `src/api/`:

```
src/api/
  client.ts                 # axios instance + interceptors
  concept/                  # domain (user, auth, cart, invoices, etc.)
    get/
      getConceptName/
        getConceptName.ts
        getConceptName.interface.ts
    post/
      postConceptName/
        postConceptName.ts
        postConceptName.interface.ts
```

### Stub Strategy

Every API file exports a single public function and implements both a real `api()` call and a `stub()` for local development. The flag is controlled via `VITE_USE_STUB=true` in `.env`.

```ts
const USE_STUB = import.meta.env.VITE_USE_STUB === "true";

export const getConceptName = async (
  params: GetConceptNameRequest
): Promise<GetConceptNameResponse> => {
  if (USE_STUB) return stub(params);
  return api(params);
};

const api = async (params: GetConceptNameRequest): Promise<GetConceptNameResponse> => {
  const { data } = await client.get<GetConceptNameResponse>(`/endpoint`);
  return data;
};

const stub = async (_params: GetConceptNameRequest): Promise<GetConceptNameResponse> => {
  return { /* mocked data */ };
};
```

**Rules:**
- Always `async/await` — no `.then()`
- Request and response types go in `conceptName.interface.ts`
- The `stub()` must return data matching the response interface

---

## Form Pattern (React Hook Form + Zod)

Every form **must** use React Hook Form with a Zod schema. The schema lives in a dedicated `schemas/` file — never inline inside the hook.

**Page form structure:**
```
src/pages/pageName/
  index.tsx
  hooks/
    usePageName.ts
  schemas/
    pageName.schema.ts       # schema + inferred type
```

**Component form structure:**
```
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.interface.ts
  schemas/
    ComponentName.schema.ts
  hooks/
    useComponentName.ts
```

**`pageName.schema.ts`:**
```ts
import { z } from "zod";

export const pageNameSchema = z.object({
  field: z.string().min(1, "Required"),
});

export type PageNameFormValues = z.infer<typeof pageNameSchema>;
```

**Hook usage:**
```ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pageNameSchema, type PageNameFormValues } from "../schemas/pageName.schema";

const form = useForm<PageNameFormValues>({
  resolver: zodResolver(pageNameSchema),
  defaultValues: { field: "" },
});
```

**Rules:**
- Schema and its inferred type are exported from the schema file
- The hook imports both — never redefines them
- One schema file per form (page or component)

---

## Query Keys

All query keys are centralized in `src/api/queryKeys.ts` as factory functions returning `const` tuples. This is the single source of truth for cache invalidation.

```ts
// src/api/queryKeys.ts
export const queryKeys = {
  concept: {
    all: () => ["concept"] as const,
    detail: (id: string) => ["concept", id] as const,
    list: (filters?: Record<string, unknown>) => ["concept", "list", filters] as const,
  },
} as const;
```

**Usage in hooks:**
```ts
// query
useQuery({ queryKey: queryKeys.user.detail(id), queryFn: ... });

// invalidation
queryClient.invalidateQueries({ queryKey: queryKeys.user.all() });
```

**Rules:**
- Never use raw string arrays as query keys — always use `queryKeys`
- Add new keys to `queryKeys.ts` when adding a new API concept
- `all()` serves as the root for broad invalidations of a concept

---

## Store Pattern (Zustand)

Stores live in `src/stores/`:

```
src/stores/
  useConceptStore.ts
```

Each store is a hook created with `create<State>()`. Name it after the concept it manages.

---

## Auth Hook

`src/hooks/auth/useAuth.ts` — thin wrapper over `useAuthStore` for consuming auth state in components.

---

## Env Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL for the API |
| `VITE_USE_STUB` | Set to `"true"` to use stub responses |

---

## Providers (main.tsx)

`main.tsx` wires up all global providers in this order:

```tsx
<QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</QueryClientProvider>
```
