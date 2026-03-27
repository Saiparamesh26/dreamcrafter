import { Toaster } from "@/components/ui/sonner";
import { routeTree } from "@/routeTree";
import {
  RouterProvider,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";

const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
