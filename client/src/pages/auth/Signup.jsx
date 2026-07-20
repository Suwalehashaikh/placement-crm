import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import loginBg from "../../assets/login-bg.jpg";
import { signupUser } from "../../services/authService";
import Loader from "../../components/common/Loader";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
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

      await signupUser(formData);

      toast.success("OTP Sent Successfully");

      navigate("/otp-verify", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <img
        src={loginBg}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
          {/* Left Side */}
          <div className="hidden lg:block text-white">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              Placement Management System
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight">
              Build Your
              <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                Admin Workspace
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Create your administrator account and start managing students,
              placements, alumni, resumes and courses from one centralized
              platform.
            </p>
          </div>

          {/* Signup Card */}
          <div className="mx-auto w-full max-w-md">
            <div className="rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-[0_25px_80px_rgba(0,0,0,.35)] backdrop-blur-2xl sm:p-8">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-xl">
                  <UserPlus size={38} className="text-white" />
                </div>

                <h2 className="mt-6 text-3xl font-bold text-white">
                  Create Account
                </h2>

                <p className="mt-3 text-slate-300">
                  Join Placement CRM as an administrator.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-slate-400 outline-none transition-all focus:border-indigo-400 focus:bg-white/20"
                  />
                </div>

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
                    placeholder="admin@example.com"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-slate-400 outline-none transition-all focus:border-indigo-400 focus:bg-white/20"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Create a secure password"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-slate-400 outline-none transition-all focus:border-indigo-400 focus:bg-white/20"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="+91 9876543210"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-slate-400 outline-none transition-all focus:border-indigo-400 focus:bg-white/20"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:scale-[1.02] disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                {/* Login */}
                <p className="text-center text-sm text-slate-300">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-indigo-300 transition hover:text-white"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;