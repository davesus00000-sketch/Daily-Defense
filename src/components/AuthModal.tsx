import React, { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  LogIn,
  UserPlus,
  ChevronLeft,
} from "lucide-react";
import {
  signInWithGoogle,
  registerWithEmailAndPassword,
  signInWithEmailOrUsername,
  sendPasswordReset,
} from "../services/firebase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "login" | "register";
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = "login",
  onSuccess,
}) => {
  // Sign in comes first
  const [tab, setTab] = useState<"login" | "register" | "forgot">("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync initial tab when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setTab(initialTab || "login");
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleTabChange = (newTab: "login" | "register" | "forgot") => {
    setTab(newTab);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setErrorMessage(null);
    try {
      const user = await signInWithGoogle();
      if (!user) {
        // User closed popup window
        return;
      }
      setSuccessMessage("Successfully signed in with Google!");
      setTimeout(() => {
        onSuccess?.();
        onClose();
        resetForm();
      }, 700);
    } catch (err: any) {
      if (err?.code === "auth/popup-closed-by-user") {
        return;
      }
      if (err?.code === "auth/popup-blocked") {
        setErrorMessage("Popup blocked by browser. Please allow popups for this site.");
      } else {
        setErrorMessage(err?.message || "Failed to sign in with Google.");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (tab === "forgot") {
      if (!email.trim()) {
        setErrorMessage("Please enter your email address to receive password reset instructions.");
        return;
      }
      setIsLoading(true);
      try {
        await sendPasswordReset(email.trim());
        setSuccessMessage("Password reset email sent! Check your inbox.");
        setTimeout(() => {
          handleTabChange("login");
        }, 2000);
      } catch (err: any) {
        setErrorMessage(getFriendlyErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (tab === "register") {
      if (!username.trim()) {
        setErrorMessage("Please choose a Defender username.");
        return;
      }
      if (!email.trim() || !email.includes("@")) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      setIsLoading(true);
      try {
        await registerWithEmailAndPassword(username.trim(), email.trim(), password);
        setSuccessMessage("Account created successfully! Welcome to Daily Defense.");
        setTimeout(() => {
          onSuccess?.();
          onClose();
          resetForm();
        }, 800);
      } catch (err: any) {
        setErrorMessage(getFriendlyErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (tab === "login") {
      if (!email.trim()) {
        setErrorMessage("Please enter your email or username.");
        return;
      }
      if (!password) {
        setErrorMessage("Please enter your password.");
        return;
      }

      setIsLoading(true);
      try {
        await signInWithEmailOrUsername(email.trim(), password);
        setSuccessMessage("Welcome back! Signing you in...");
        setTimeout(() => {
          onSuccess?.();
          onClose();
          resetForm();
        }, 700);
      } catch (err: any) {
        setErrorMessage(getFriendlyErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getFriendlyErrorMessage = (err: any): string => {
    const code = err?.code || "";
    switch (code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Invalid email, username, or password. Please try again.";
      case "auth/email-already-in-use":
        return "An account with this email already exists. Try signing in below or use Google.";
      case "auth/weak-password":
        return "Password is too weak. Please use at least 6 characters with mixed letters/numbers.";
      case "auth/invalid-email":
        return "Please enter a valid email address format.";
      case "auth/operation-not-allowed":
        return "Email/Password sign-in is currently being configured. Please sign in directly with Google!";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please reset your password or try again later.";
      default:
        return err?.message || "An unexpected error occurred. Please try again.";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-[#e2ddd6] relative flex flex-col">
        {/* Header with Catholic aesthetic */}
        <div className="bg-gradient-to-r from-[#1e3a8a] via-[#1e3a8a] to-[#2546a8] text-white p-6 relative">
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c] flex items-center justify-center text-[#1e3a8a] font-black text-2xl shadow-inner select-none shrink-0">
              ✝
            </div>
            <div>
              <div className="flex items-center gap-2">
                {tab !== "login" && (
                  <button
                    type="button"
                    onClick={() => handleTabChange("login")}
                    className="text-blue-200 hover:text-white inline-flex items-center text-xs font-semibold mr-1 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                )}
                <h2 className="text-xl font-bold tracking-wide">
                  {tab === "login"
                    ? "Sign In"
                    : tab === "register"
                    ? "Create Account"
                    : "Reset Password"}
                </h2>
              </div>
              <p className="text-xs text-blue-200/90 mt-0.5">
                {tab === "login"
                  ? "Sign in to access your saved notes, XP & badges"
                  : tab === "register"
                  ? "Register to sync your apologetics study across devices"
                  : "Enter your email to receive recovery instructions"}
              </p>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto flex-1">
          {/* Status Banners */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{successMessage}</div>
            </div>
          )}

          {/* Google Sign In option (available on both sign in and register) */}
          {tab !== "forgot" && (
            <>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isLoading}
                className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 rounded-xl font-medium text-sm text-gray-700 shadow-xs flex items-center justify-center gap-3 transition cursor-pointer disabled:opacity-60"
              >
                {/* Official Google 'G' icon */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>
                  {isGoogleLoading
                    ? "Connecting to Google..."
                    : tab === "register"
                    ? "Sign up with Google"
                    : "Sign in with Google"}
                </span>
              </button>

              <div className="relative flex items-center justify-center my-1.5">
                <div className="border-t border-gray-200 w-full" />
                <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-gray-500 font-semibold absolute">
                  {tab === "register" ? "or register with email" : "or with username & password"}
                </span>
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {tab === "register" && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Defender Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. StThomasDefender"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#f8f7f4] border border-gray-300 focus:border-[#1e3a8a] focus:bg-white rounded-xl text-sm outline-none transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {tab === "register" || tab === "forgot" ? "Email Address" : "Email or Username"}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type={tab === "register" || tab === "forgot" ? "email" : "text"}
                  required
                  placeholder={
                    tab === "register" || tab === "forgot"
                      ? "defender@catholic.org"
                      : "Email or username"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#f8f7f4] border border-gray-300 focus:border-[#1e3a8a] focus:bg-white rounded-xl text-sm outline-none transition"
                />
              </div>
            </div>

            {tab !== "forgot" && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-gray-700">
                    Password
                  </label>
                  {tab === "login" && (
                    <button
                      type="button"
                      onClick={() => handleTabChange("forgot")}
                      className="text-xs text-[#1e3a8a] hover:underline font-medium cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2 bg-[#f8f7f4] border border-gray-300 focus:border-[#1e3a8a] focus:bg-white rounded-xl text-sm outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {tab === "register" && (
                  <p className="text-[11px] text-gray-500 mt-1">
                    At least 6 characters.
                  </p>
                )}
              </div>
            )}

            {tab === "register" && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#f8f7f4] border border-gray-300 focus:border-[#1e3a8a] focus:bg-white rounded-xl text-sm outline-none transition"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full py-2.5 px-4 bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
            >
              {isLoading ? (
                <span>Processing...</span>
              ) : tab === "register" ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#f0d080]" />
                  <span>Create Account</span>
                </>
              ) : tab === "forgot" ? (
                <>
                  <Mail className="w-4 h-4 text-[#f0d080]" />
                  <span>Send Reset Link</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-[#f0d080]" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Prompt at the bottom of Sign In: if no account, put a register button */}
          {tab === "login" && (
            <div className="pt-3.5 mt-2 border-t border-gray-100 flex items-center justify-between gap-2.5 bg-amber-50/70 -mx-6 -mb-6 p-4 border-b rounded-b-3xl">
              <div className="min-w-0">
                <p className="text-xs text-gray-800 font-semibold truncate">
                  Don't have an account?
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 truncate">
                  Register to save your defense progress
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleTabChange("register")}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white hover:bg-gray-50 text-[#1e3a8a] border border-[#1e3a8a]/40 hover:border-[#1e3a8a] rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer shrink-0"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Register</span>
              </button>
            </div>
          )}

          {/* Prompt at the bottom of Register: Already have an account? then sign in button */}
          {tab === "register" && (
            <div className="pt-3.5 mt-2 border-t border-gray-100 flex items-center justify-between gap-2.5 bg-blue-50/70 -mx-6 -mb-6 p-4 border-b rounded-b-3xl">
              <div className="min-w-0">
                <p className="text-xs text-gray-800 font-semibold truncate">
                  Already have an account?
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 truncate">
                  Sign in with credentials or Google
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleTabChange("login")}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#1e3a8a] hover:bg-blue-900 active:bg-blue-950 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 text-[#f0d080]" />
                <span>Sign In</span>
              </button>
            </div>
          )}

          {/* Prompt at the bottom of Forgot Password */}
          {tab === "forgot" && (
            <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between gap-2 bg-gray-50 -mx-6 -mb-6 p-4 rounded-b-3xl">
              <span className="text-xs text-gray-600">Remembered your credentials?</span>
              <button
                type="button"
                onClick={() => handleTabChange("login")}
                className="px-3.5 py-1.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
