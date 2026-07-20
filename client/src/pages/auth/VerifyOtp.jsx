import { useState } from "react";
import {
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";

import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import toast from "react-hot-toast";

import loginBg from "../../assets/login-bg.jpg";

import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/common/Loader";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { verifyUserOtp } = useAuth();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      await verifyUserOtp(email, otp);

      toast.success("OTP Verified Successfully 🎉");

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "OTP Verification Failed"
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

      <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm" />


      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">


          {/* Left Section */}

          <div className="hidden lg:block text-white">

            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              Placement Management System
            </span>


            <h1 className="mt-8 text-5xl font-black leading-tight">

              Secure

              <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                OTP Verification
              </span>

            </h1>


            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              We sent a verification code to your email.
              Enter the OTP below to continue securely.
            </p>

          </div>



          {/* OTP Card */}

          <div className="mx-auto w-full max-w-md">

            <div className="
              rounded-[32px]
              border
              border-white/20
              bg-white/10
              p-6
              shadow-[0_25px_80px_rgba(0,0,0,.35)]
              backdrop-blur-2xl
              sm:p-8
            ">


              <div className="text-center">


                <div className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-3xl
                  bg-gradient-to-br
                  from-indigo-600
                  to-violet-600
                  shadow-xl
                ">

                  <ShieldCheck
                    size={38}
                    className="text-white"
                  />

                </div>


                <h2 className="mt-6 text-3xl font-bold text-white">
                  Verify OTP
                </h2>


                <p className="mt-3 text-slate-300">
                  Enter the 6-digit verification code sent to
                </p>


                <p className="mt-2 break-all font-semibold text-indigo-300">
                  {email}
                </p>

              </div>



              {/* FORM START */}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >


                <div>

                  <label className="mb-2 block text-sm font-medium text-white">
                    Verification Code
                  </label>


                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e)=>
                      setOtp(
                        e.target.value.replace(/\D/g,"")
                      )
                    }
                    disabled={loading}
                    placeholder="••••••"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-white/20
                      bg-white/10
                      px-5
                      py-4
                      text-center
                      text-3xl
                      font-bold
                      tracking-[0.7em]
                      text-white
                      placeholder:text-slate-400
                      outline-none
                      transition-all
                      focus:border-indigo-400
                      focus:bg-white/20
                    "
                  />



                  <p className="mt-3 text-center text-sm text-slate-300">

                    Didn't receive the code?

                    <button
                      type="button"
                      className="
                        ml-2
                        font-semibold
                        text-indigo-300
                        transition
                        hover:text-white
                      "
                    >
                      Resend OTP
                    </button>

                  </p>


                </div>




                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-gradient-to-r
                    from-indigo-600
                    via-violet-600
                    to-purple-600
                    py-4
                    text-lg
                    font-semibold
                    text-white
                    shadow-xl
                    transition
                    hover:scale-[1.02]
                    disabled:opacity-70
                  "
                >

                  {
                    loading ? (
                      <>
                        <Loader />
                        <span>
                          Verifying...
                        </span>
                      </>
                    )
                    :
                    (
                      <>
                        Verify OTP
                        <ArrowRight size={20}/>
                      </>
                    )
                  }

                </button>




                <Link
                  to="/login"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    font-medium
                    text-slate-300
                    transition
                    hover:text-white
                  "
                >

                  <ArrowLeft size={16}/>

                  Back to Login

                </Link>


              </form>

              {/* FORM END */}


            </div>

          </div>


        </div>

      </div>

    </div>
  );
};


export default VerifyOtp;