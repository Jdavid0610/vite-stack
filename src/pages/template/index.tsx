const stack = [
  {
    name: "Vite",
    description: "Lightning-fast dev server with instant HMR",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
  },
  {
    name: "React 19",
    description: "UI library with the latest concurrent features",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  {
    name: "TypeScript",
    description: "Static typing across the entire codebase",
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    dot: "bg-sky-500",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first styling with v4 Vite plugin",
    badge: "bg-teal-100 text-teal-700 border-teal-200",
    dot: "bg-teal-500",
  },
  {
    name: "React Router",
    description: "File-driven routing with layout & private route support",
    badge: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
  {
    name: "Zustand",
    description: "Minimal client state — one store per domain concept",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    dot: "bg-orange-500",
  },
  {
    name: "TanStack Query",
    description: "Server state, caching, and cache invalidation via query keys",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
  },
  {
    name: "React Hook Form",
    description: "Performant forms with schema-driven validation",
    badge: "bg-pink-100 text-pink-700 border-pink-200",
    dot: "bg-pink-500",
  },
  {
    name: "Zod",
    description: "TypeScript-first schema validation for forms and APIs",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
    dot: "bg-indigo-500",
  },
  {
    name: "Axios",
    description: "HTTP client with request/response interceptors",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
  },
];

const conventions = [
  {
    title: "Component",
    color: "border-blue-200",
    headerColor: "bg-blue-50 border-blue-200",
    tagColor: "bg-blue-100 text-blue-700",
    structure: [
      { name: "ComponentName/", type: "folder" },
      { name: "  ComponentName.tsx", type: "file", note: "UI + JSX only" },
      { name: "  ComponentName.interface.ts", type: "file", note: "props interface" },
      { name: "  schemas/", type: "folder", note: "if has a form" },
      { name: "    ComponentName.schema.ts", type: "file", note: "zod schema + inferred type" },
      { name: "  hooks/", type: "folder", note: "if has logic" },
      { name: "    useComponentName.ts", type: "file", note: "component-scoped logic" },
    ],
  },
  {
    title: "Page",
    color: "border-purple-200",
    headerColor: "bg-purple-50 border-purple-200",
    tagColor: "bg-purple-100 text-purple-700",
    structure: [
      { name: "pageName/", type: "folder" },
      { name: "  index.tsx", type: "file", note: "UI only — no logic" },
      { name: "  schemas/", type: "folder", note: "if has a form" },
      { name: "    pageName.schema.ts", type: "file", note: "zod schema + inferred type" },
      { name: "  hooks/", type: "folder" },
      { name: "    usePageName.ts", type: "file", note: "forms · queries · mutations · handlers" },
      { name: "  components/", type: "folder", note: "page-exclusive only" },
      { name: "    ComponentName/ ...", type: "file", note: "same component pattern" },
    ],
  },
  {
    title: "API",
    color: "border-teal-200",
    headerColor: "bg-teal-50 border-teal-200",
    tagColor: "bg-teal-100 text-teal-700",
    structure: [
      { name: "api/", type: "folder" },
      { name: "  client.ts", type: "file", note: "axios instance + interceptors" },
      { name: "  queryKeys.ts", type: "file", note: "all query key factories" },
      { name: "  concept/", type: "folder", note: "user · auth · cart · invoices…" },
      { name: "    get/getConceptName/", type: "folder" },
      { name: "      getConceptName.ts", type: "file", note: "public fn · api() · stub()" },
      { name: "      getConceptName.interface.ts", type: "file", note: "request + response types" },
      { name: "    post/postConceptName/ ...", type: "file", note: "same pattern" },
    ],
  },
];

const codeExamples = [
  {
    title: "API call — stub strategy",
    color: "border-teal-200",
    headerColor: "bg-teal-50",
    lang: "ts",
    code: `const USE_STUB = import.meta.env.VITE_USE_STUB === "true";

export const getUser = async (
  params: GetUserRequest
): Promise<GetUserResponse> => {
  if (USE_STUB) return stub(params);
  return api(params);
};

const api = async ({ id }: GetUserRequest) => {
  const { data } = await client.get<GetUserResponse>(\`/users/\${id}\`);
  return data;
};

const stub = async (): Promise<GetUserResponse> => ({
  id: "1", name: "John Doe", email: "john@example.com",
});`,
  },
  {
    title: "Form schema",
    color: "border-pink-200",
    headerColor: "bg-pink-50",
    lang: "ts",
    code: `// schemas/pageName.schema.ts
import { z } from "zod";

export const pageNameSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export type PageNameFormValues = z.infer<typeof pageNameSchema>;`,
  },
  {
    title: "Page hook — form + mutation",
    color: "border-purple-200",
    headerColor: "bg-purple-50",
    lang: "ts",
    code: `// hooks/usePageName.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { pageNameSchema, type PageNameFormValues }
  from "../schemas/pageName.schema";

const usePageName = () => {
  const form = useForm<PageNameFormValues>({
    resolver: zodResolver(pageNameSchema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({ mutationFn: login });
  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return { form, onSubmit, isLoading: mutation.isPending };
};`,
  },
  {
    title: "Query keys",
    color: "border-rose-200",
    headerColor: "bg-rose-50",
    lang: "ts",
    code: `// api/queryKeys.ts
export const queryKeys = {
  user: {
    all: () => ["user"] as const,
    detail: (id: string) => ["user", id] as const,
    list: (filters?: Record<string, unknown>) =>
      ["user", "list", filters] as const,
  },
} as const;

// usage — query
useQuery({ queryKey: queryKeys.user.detail(id), queryFn: ... });

// usage — invalidation
queryClient.invalidateQueries({ queryKey: queryKeys.user.all() });`,
  },
  {
    title: "Zustand store",
    color: "border-orange-200",
    headerColor: "bg-orange-50",
    lang: "ts",
    code: `// stores/useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));`,
  },
];

const envVars = [
  { key: "VITE_API_URL", description: "Base URL for the API (e.g. https://api.example.com)" },
  { key: "VITE_USE_STUB", description: 'Set to "true" to serve stub responses instead of real API calls' },
];

const Template = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Template · v0.1.0
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Vite React TS Stack
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            An opinionated template with enforced conventions for components,
            pages, API calls, forms, and state management.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-16">
        {/* Tech Stack */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Tech Stack
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stack.map((item) => (
              <div
                key={item.name}
                className={`flex items-start gap-3 bg-white border rounded-xl p-4 ${item.badge.split(" ").find((c) => c.startsWith("border")) ?? ""}`}
              >
                <span className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${item.dot}`} />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Folder Conventions */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Folder Conventions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {conventions.map((conv) => (
              <div
                key={conv.title}
                className={`bg-white border rounded-xl overflow-hidden ${conv.color}`}
              >
                <div className={`px-4 py-3 border-b flex items-center gap-2 ${conv.headerColor}`}>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${conv.tagColor}`}>
                    {conv.title}
                  </span>
                </div>
                <div className="px-4 py-4">
                  <ul className="space-y-1.5">
                    {conv.structure.map((item, i) => (
                      <li key={i} className="flex items-baseline gap-2">
                        <code className={`text-xs font-mono whitespace-pre ${item.type === "folder" ? "text-gray-700 font-semibold" : "text-gray-600"}`}>
                          {item.name}
                        </code>
                        {item.note && (
                          <span className="text-gray-400 text-xs shrink-0">{item.note}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code Examples */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Code Patterns
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {codeExamples.map((example) => (
              <div
                key={example.title}
                className={`bg-white border rounded-xl overflow-hidden ${example.color}`}
              >
                <div className={`px-4 py-3 border-b ${example.headerColor} ${example.color.replace("border-", "border-b-")}`}>
                  <p className="text-xs font-semibold text-gray-700">{example.title}</p>
                </div>
                <pre className="p-4 text-xs font-mono text-gray-700 overflow-x-auto leading-relaxed bg-gray-950 text-green-300 rounded-b-xl">
                  <code>{example.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* Rules */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Key Rules
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
            {[
              { rule: "index.tsx is UI only", detail: "No business logic, no direct API calls — all of that goes in the page hook." },
              { rule: "Schema files are separate", detail: "Never define a Zod schema inline inside a hook. Always use schemas/pageName.schema.ts." },
              { rule: "Never use raw query key arrays", detail: "Always reference queryKeys.concept.method() — never write [\"user\", id] directly." },
              { rule: "Every API has a stub", detail: "Controlled by VITE_USE_STUB=true. The stub must return data matching the response interface." },
              { rule: "Always async/await", detail: "No .then() chains anywhere in API call files." },
              { rule: "One store per domain", detail: "Stores live in src/stores/useConceptStore.ts and are named after what they manage." },
              { rule: "Page components live with the page", detail: "Components used only by one page go in pages/pageName/components/, not in src/components/." },
            ].map(({ rule, detail }) => (
              <div key={rule} className="px-5 py-4 flex items-start gap-3">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center shrink-0 font-bold">✓</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{rule}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Env Variables */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Environment Variables
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">Variable</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {envVars.map(({ key, description }) => (
                  <tr key={key}>
                    <td className="px-5 py-3">
                      <code className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded">{key}</code>
                    </td>
                    <td className="px-5 py-3 text-gray-600 text-sm">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pb-4">
          <p className="text-xs text-gray-400">
            This page is the template root. Replace it or remove it once your project is underway.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Template;
