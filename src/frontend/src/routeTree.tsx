import AnalysisPathPage from "@/pages/AnalysisPathPage";
import ApiKeysPage from "@/pages/ApiKeysPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import {
  Navigate,
  createRootRoute,
  createRoute,
  redirect,
} from "@tanstack/react-router";

function isLoggedIn() {
  return localStorage.getItem("dreamcrafter_logged_in") === "true";
}

const rootRoute = createRootRoute({
  notFoundComponent: () => <Navigate to="/" replace />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
  beforeLoad: () => {
    if (isLoggedIn()) {
      throw redirect({ to: "/" });
    }
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
  beforeLoad: () => {
    if (!isLoggedIn()) {
      throw redirect({ to: "/login" });
    }
  },
});

const analysisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analysis",
  component: AnalysisPathPage,
  beforeLoad: () => {
    if (!isLoggedIn()) {
      throw redirect({ to: "/login" });
    }
  },
  validateSearch: (search: Record<string, unknown>) => ({
    company: typeof search.company === "string" ? search.company : undefined,
  }),
});

const apiKeysRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/api-keys",
  component: ApiKeysPage,
  beforeLoad: () => {
    if (!isLoggedIn()) {
      throw redirect({ to: "/login" });
    }
  },
});

export const routeTree = rootRoute.addChildren([
  loginRoute,
  indexRoute,
  analysisRoute,
  apiKeysRoute,
]);
