import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Toast {
  id: number;
  message: string;
  type: "error" | "success";
  visible: boolean;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const starsRef = useRef<HTMLDivElement>(null);
  const toastIdRef = useRef(0);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    for (let i = 0; i < 120; i++) {
      const star = document.createElement("div");
      const isBright = i < 15;
      const size = isBright ? Math.random() * 1.5 + 2 : Math.random() * 2 + 0.5;
      const opacity = isBright ? 0.9 : 0.8;
      // Cool white and pale cyan tones
      const starColor = isBright
        ? i % 3 === 0
          ? "#cffafe"
          : i % 3 === 1
            ? "#a5f3fc"
            : "#e0f2fe"
        : i % 2 === 0
          ? "#ffffff"
          : "#ccfbf1";
      star.style.cssText = [
        "position: absolute",
        `width: ${size}px`,
        `height: ${size}px`,
        `background: ${starColor}`,
        "border-radius: 50%",
        `left: ${Math.random() * 100}%`,
        `top: ${Math.random() * 100}%`,
        "opacity: 0",
        `box-shadow: ${isBright ? "0 0 5px 1px rgba(103,232,249,0.55)" : "none"}`,
        `animation: floatTwinkle ${Math.random() * 4 + 2}s ${Math.random() * 3}s infinite alternate linear`,
        `--max-opacity: ${opacity}`,
      ].join(";");
      container.appendChild(star);
    }
    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  const showToast = useCallback(
    (message: string, type: "error" | "success") => {
      const id = ++toastIdRef.current;
      setToasts((prev) => [...prev, { id, message, type, visible: false }]);
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, visible: true } : t)),
        );
      }, 10);
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, visible: false } : t)),
        );
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 400);
      }, 4000);
    },
    [],
  );

  function isValidEmail(val: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please fill in all fields to login.", "error");
      return;
    }
    if (!isValidEmail(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      if (password.length >= 6) {
        showToast(`Login successful! Welcome, ${email}`, "success");
        localStorage.setItem("dreamcrafter_logged_in", "true");
        localStorage.setItem("dreamcrafter_user_email", email);
        setTimeout(() => {
          void navigate({ to: "/" });
        }, 1200);
      } else {
        setIsLoading(false);
        showToast("Invalid credentials. Please try again.", "error");
        setPassword("");
      }
    }, 1500);
  }

  function handleGoogleLogin() {
    setIsGoogleLoading(true);
    showToast("Connecting to Google...", "success");
    // Simulate Google OAuth flow
    setTimeout(() => {
      const googleEmail = "user@gmail.com";
      showToast(`Login successful! Welcome, ${googleEmail}`, "success");
      localStorage.setItem("dreamcrafter_logged_in", "true");
      localStorage.setItem("dreamcrafter_user_email", googleEmail);
      setTimeout(() => {
        void navigate({ to: "/" });
      }, 1200);
    }, 1800);
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background:
          "linear-gradient(160deg, #000510 0%, #020818 40%, #010d1a 70%, #000408 100%)",
        color: "#fcfcfc",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes floatTwinkle {
          0% { opacity: 0.1; transform: translateY(0) scale(0.8); }
          100% { opacity: 0.8; transform: translateY(-10px) scale(1.2); }
        }
        @keyframes fadeInBody {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes nebulaFlow1 {
          0%   { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.28; }
          30%  { transform: translate(30px, -50px) scale(1.06) rotate(3deg); opacity: 0.34; }
          70%  { transform: translate(-20px, 35px) scale(0.97) rotate(-2deg); opacity: 0.25; }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.28; }
        }
        @keyframes nebulaFlow2 {
          0%   { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.22; }
          40%  { transform: translate(-40px, 25px) scale(1.08) rotate(-4deg); opacity: 0.30; }
          80%  { transform: translate(50px, -30px) scale(0.94) rotate(3deg); opacity: 0.20; }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.22; }
        }
        @keyframes nebulaFlow3 {
          0%   { transform: translate(0, 0) scale(1); opacity: 0.18; }
          50%  { transform: translate(25px, 45px) scale(1.1); opacity: 0.26; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.18; }
        }
        @keyframes rayDrift {
          0%   { opacity: 0.06; transform: skewX(-10deg) translateX(0); }
          50%  { opacity: 0.12; transform: skewX(-10deg) translateX(18px); }
          100% { opacity: 0.06; transform: skewX(-10deg) translateX(0); }
        }
        @keyframes rayDrift2 {
          0%   { opacity: 0.04; transform: skewX(8deg) translateX(0); }
          50%  { opacity: 0.09; transform: skewX(8deg) translateX(-14px); }
          100% { opacity: 0.04; transform: skewX(8deg) translateX(0); }
        }
        .login-input {
          width: 100%;
          background: #0a1628;
          border: 1px solid rgba(6,182,212,0.12);
          color: #fcfcfc;
          font-family: inherit;
          padding: 0.85rem 1rem;
          border-radius: 10px;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          outline: none;
          box-sizing: border-box;
        }
        .login-input::placeholder { color: #3a5068; }
        .login-input:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 0 3px rgba(6,182,212,0.18);
          background: #0c1d32;
        }
        .login-input:disabled { opacity: 0.6; cursor: not-allowed; }
        .social-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          color: #fcfcfc;
          padding: 0.75rem;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          font-family: inherit;
          transition: all 0.2s ease;
        }
        .social-btn:hover:not(:disabled) {
          background: rgba(6,182,212,0.06);
          border-color: rgba(6,182,212,0.3);
        }
        .social-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #0891b2 0%, #0d9488 100%);
          color: white;
          border: none;
          padding: 0.9rem;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 4px 18px 0 rgba(8,145,178,0.38);
        }
        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #0e7490 0%, #0f766e 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 24px 0 rgba(8,145,178,0.46);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(1px); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .forgot-link { color: #22d3ee; text-decoration: none; font-size: 0.8rem; font-weight: 500; transition: color 0.2s; background: none; border: none; cursor: pointer; padding: 0; }
        .forgot-link:hover { color: #67e8f9; }
        .toggle-pwd-btn { position: absolute; right: 0.8rem; background: none; border: none; color: #3a5068; cursor: pointer; padding: 0.2rem; display: flex; align-items: center; justify-content: center; transition: color 0.2s; }
        .toggle-pwd-btn:hover { color: #67e8f9; }
      `}</style>

      {/* ── Deep space nebula background ── */}

      {/* Nebula cloud 1 — teal, top-left */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: 900,
          height: 700,
          borderRadius: "60% 40% 55% 45% / 50% 60% 40% 55%",
          background:
            "radial-gradient(ellipse, rgba(13,148,136,0.30) 0%, rgba(6,182,212,0.14) 45%, transparent 72%)",
          filter: "blur(90px)",
          zIndex: 0,
          pointerEvents: "none",
          animation: "nebulaFlow1 24s ease-in-out infinite",
        }}
      />

      {/* Nebula cloud 2 — cyan, bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-12%",
          width: 950,
          height: 800,
          borderRadius: "45% 55% 40% 60% / 60% 45% 55% 40%",
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.26) 0%, rgba(29,78,216,0.18) 50%, transparent 72%)",
          filter: "blur(100px)",
          zIndex: 0,
          pointerEvents: "none",
          animation: "nebulaFlow2 30s ease-in-out infinite",
        }}
      />

      {/* Nebula cloud 3 — deep blue accent, mid-right */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-5%",
          width: 600,
          height: 600,
          borderRadius: "50% 60% 45% 55% / 55% 50% 60% 45%",
          background:
            "radial-gradient(ellipse, rgba(29,78,216,0.22) 0%, rgba(13,148,136,0.10) 55%, transparent 75%)",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
          animation: "nebulaFlow3 20s ease-in-out infinite",
        }}
      />

      {/* Nebula cloud 4 — emerald hint, bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "0%",
          width: 550,
          height: 500,
          borderRadius: "55% 45% 60% 40% / 45% 55% 40% 60%",
          background:
            "radial-gradient(ellipse, rgba(16,185,129,0.18) 0%, rgba(6,182,212,0.08) 55%, transparent 75%)",
          filter: "blur(75px)",
          zIndex: 0,
          pointerEvents: "none",
          animation: "nebulaFlow1 35s ease-in-out infinite reverse",
        }}
      />

      {/* Diagonal light ray 1 */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "15%",
          width: "3px",
          height: "130%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.55) 30%, rgba(13,148,136,0.40) 60%, transparent 100%)",
          filter: "blur(6px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "skewX(-18deg)",
          animation: "rayDrift 12s ease-in-out infinite",
        }}
      />
      {/* Diagonal light ray 2 */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "22%",
          width: "1.5px",
          height: "120%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(34,211,238,0.35) 40%, rgba(6,182,212,0.20) 70%, transparent 100%)",
          filter: "blur(4px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "skewX(-18deg)",
          animation: "rayDrift 16s ease-in-out infinite 3s",
        }}
      />
      {/* Diagonal light ray 3 */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "20%",
          width: "2px",
          height: "130%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(13,148,136,0.45) 35%, rgba(16,185,129,0.25) 65%, transparent 100%)",
          filter: "blur(5px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "skewX(14deg)",
          animation: "rayDrift2 18s ease-in-out infinite 1.5s",
        }}
      />
      {/* Diagonal light ray 4 — faint wide sweep */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "40%",
          width: "80px",
          height: "100%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.05) 30%, rgba(6,182,212,0.08) 55%, transparent 100%)",
          filter: "blur(28px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "skewX(-12deg)",
          animation: "rayDrift 22s ease-in-out infinite 4s",
        }}
      />

      {/* Diagonal line pattern overlay (45-deg faint lines) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(6,182,212,0.025) 0px, rgba(6,182,212,0.025) 1px, transparent 1px, transparent 48px)",
          opacity: 0.8,
        }}
      />

      {/* Centre radial spotlight — soft warm-white glow where the card sits */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(224,242,254,0.04) 0%, rgba(186,230,253,0.02) 40%, transparent 70%)",
        }}
      />

      {/* Stars */}
      <div
        ref={starsRef}
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 72% 72% at 50% 50%, transparent 38%, rgba(0,4,12,0.60) 100%)",
        }}
      />

      {/* Toast container */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            style={{
              background: "#07111f",
              color: "#fff",
              border: "1px solid rgba(6,182,212,0.15)",
              borderLeft: `4px solid ${t.type === "success" ? "#10b981" : "#ef4444"}`,
              padding: "1rem 1.5rem",
              borderRadius: 12,
              fontSize: "0.9rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.6)",
              transform: t.visible ? "translateX(0)" : "translateX(120%)",
              opacity: t.visible ? 1 : 0,
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              maxWidth: 340,
            }}
            data-ocid="login.toast"
          >
            {t.type === "success" ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                aria-label="Success"
                role="img"
                style={{ flexShrink: 0 }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                aria-label="Error"
                role="img"
                style={{ flexShrink: 0 }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            )}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Wrapper */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 440,
          padding: "2rem",
          animation: "fadeInBody 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
          opacity: 0,
          transform: "translateY(20px)",
        }}
      >
        {/* Branding */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#3a7d8c",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Dream Crafters
          </div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              background:
                "linear-gradient(135deg, #ffffff 0%, #67e8f9 60%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.5rem",
              lineHeight: 1.1,
            }}
          >
            Market Scout
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#4a7f8f", fontWeight: 400 }}>
            Scout smarter. Stay ahead.
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            width: "100%",
            background: "rgba(4,14,28,0.70)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(6,182,212,0.13)",
            borderRadius: 20,
            padding: "2.5rem",
            boxShadow:
              "0 25px 60px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(6,182,212,0.07)",
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "#94b8c8",
                  marginBottom: "0.5rem",
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="login-input"
                placeholder="janedoe@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isGoogleLoading}
                data-ocid="login.input"
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <label
                  htmlFor="password"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "#94b8c8",
                  }}
                >
                  Password
                </label>
                <button type="button" className="forgot-link">
                  Forgot password?
                </button>
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || isGoogleLoading}
                  style={{ paddingRight: "2.5rem" }}
                  data-ocid="login.input"
                />
                <button
                  type="button"
                  className="toggle-pwd-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label
              htmlFor="remember-me"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.5rem",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 18,
                  height: 18,
                  flexShrink: 0,
                }}
              >
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                    margin: 0,
                    cursor: "pointer",
                  }}
                  data-ocid="login.checkbox"
                />
                <div
                  style={{
                    width: 18,
                    height: 18,
                    background: rememberMe ? "#0891b2" : "#0a1628",
                    border: `1px solid ${rememberMe ? "#06b6d4" : "rgba(6,182,212,0.15)"}`,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    pointerEvents: "none",
                  }}
                >
                  {rememberMe && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.5 5L4 7.5L8.5 2.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span style={{ fontSize: "0.85rem", color: "#4a6a7a" }}>
                Remember me for 30 days
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading || isGoogleLoading}
              data-ocid="login.submit_button"
            >
              {isLoading ? (
                <div
                  style={{
                    width: 20,
                    height: 20,
                    border: "2.5px solid rgba(255,255,255,0.3)",
                    borderRadius: "50%",
                    borderTopColor: "#fff",
                    animation: "spin 0.8s ease-in-out infinite",
                  }}
                />
              ) : (
                "Log in to Scout"
              )}
            </button>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "1.25rem 0",
              }}
            >
              <div
                style={{
                  flex: 1,
                  borderBottom: "1px solid rgba(6,182,212,0.10)",
                }}
              />
              <span
                style={{
                  padding: "0 1rem",
                  color: "#2a4a5a",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 600,
                }}
              >
                Or continue with
              </span>
              <div
                style={{
                  flex: 1,
                  borderBottom: "1px solid rgba(6,182,212,0.10)",
                }}
              />
            </div>

            {/* Google button */}
            <button
              type="button"
              className="social-btn"
              onClick={handleGoogleLogin}
              disabled={isLoading || isGoogleLoading}
              data-ocid="login.secondary_button"
            >
              {isGoogleLoading ? (
                <div
                  style={{
                    width: 18,
                    height: 18,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderRadius: "50%",
                    borderTopColor: "#fff",
                    animation: "spin 0.8s ease-in-out infinite",
                  }}
                />
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-label="Google"
                  role="img"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
