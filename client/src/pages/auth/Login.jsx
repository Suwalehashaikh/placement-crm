import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight ,
} from "lucide-react";

import loginBg from "../../assets/login-bg.jpg"
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Loader from "../../components/common/Loader";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await login(
        formData.email,
        formData.password
      );

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success("Welcome Back 👋");

      if (result.verified) {
        navigate("/dashboard");
      } else {
        navigate("/otp-verify", {
          state: {
            email: formData.email,
          },
        });
      }
    } catch (error) {
      toast.error(
        error.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background Image */}
      <img
        src={loginBg}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">

          {/* Left Content */}
          <div className="hidden lg:block text-white">

            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              Placement Management System
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight">
              Manage
              <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                Student Placements
              </span>
              Smarter.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              A modern platform to manage students, courses, resumes,
              alumni and placements from one centralized dashboard.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold">500+</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Students
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold">120+</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Placements
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold">98%</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Success Rate
                </p>
              </div>

            </div>

          </div>

          {/* Login Card */}
          <div className="mx-auto w-full max-w-md">

            <div className="rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">

              <div className="mb-8 text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 text-3xl font-bold text-white shadow-xl">
                  P
                </div>

                <h2 className="mt-6 text-3xl font-bold text-white">
                  Welcome Back
                </h2>

                <p className="mt-2 text-slate-300">
                  Sign in to continue to Placement CRM
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Email */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-white">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Enter your email"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-slate-300 outline-none transition focus:border-indigo-400 focus:bg-white/20"
                  />

                </div>

                {/* Password */}
<div>
  <label className="mb-2 block text-sm font-medium text-white">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      required
      value={formData.password}
      onChange={handleChange}
      disabled={loading}
      placeholder="Enter password"
      className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 pr-12 text-white placeholder:text-slate-300 outline-none transition focus:border-indigo-400 focus:bg-white/20"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>
</div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 py-4 text-lg font-semibold text-white shadow-xl transition hover:scale-[1.02] disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader />
                      <span className="ml-2">
                        Signing In...
                      </span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;