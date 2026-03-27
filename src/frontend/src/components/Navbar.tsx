import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LogOut, Zap } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clear } = useInternetIdentity();

  const links = [
    { label: "Home", to: "/" as const },
    { label: "Analysis Path", to: "/analysis" as const },
    { label: "API Keys", to: "/api-keys" as const },
  ];

  function handleLogout() {
    try {
      clear();
    } catch (_) {}
    localStorage.removeItem("dreamcrafter_logged_in");
    void navigate({ to: "/login" });
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 gap-4"
      style={{
        background: "rgba(11,18,32,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(34,211,238,0.1)",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 mr-6"
        data-ocid="nav.link"
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #22D3EE, #34D399)" }}
        >
          <Zap className="w-4 h-4 text-black" />
        </div>
        <span className="font-bold text-lg text-white tracking-tight">
          Dreamcrafter
        </span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-1 flex-1">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              data-ocid="nav.link"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: active ? "#22D3EE" : "#94A3B8",
                background: active ? "rgba(34,211,238,0.08)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        data-ocid="nav.button"
        className="flex items-center gap-2 text-sm"
        style={{ color: "#94A3B8" }}
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </nav>
  );
}
