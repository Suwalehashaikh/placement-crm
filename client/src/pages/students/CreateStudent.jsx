import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  MapPin,
  Users,
  ShieldCheck,
  ArrowLeft,
  Save,
} from "lucide-react";

import toast from "react-hot-toast";

import { createStudent } from "../../services/studentService";
import Loader from "../../components/common/Loader";

const CreateStudent = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    gender: "Male",
    age: "",
    qualification: "",
    email: "",
    phone: "",
    address: "",
    course: "",
    batch: "",
    status: "Active",
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

      await createStudent(formData);

      toast.success("Student created successfully");

      navigate("/students");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to create student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <Link
            to="/students"
            className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700"
          >
            <ArrowLeft size={18} />
            Back to Students
          </Link>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Create Student
          </h1>

          <p className="mt-2 text-slate-500">
            Add a new student into your placement management system.
          </p>

        </div>

      </div>

      {/* Form Card */}

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden"
      >

        {/* Section */}

        <div className="border-b border-slate-100 px-8 py-6">

          <h2 className="text-xl font-bold text-slate-900">
            Personal Information
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Basic details of the student.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">

          {/* Name */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Student Name
            </label>

            <div className="relative">

              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>

          </div>

          {/* Gender */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Gender
            </label>

            <div className="relative">

              <Users
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

            </div>

          </div>

          {/* Age */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Age
            </label>

            <div className="relative">

              <Calendar
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="number"
                name="age"
                required
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>

          </div>

          {/* Qualification */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Qualification
            </label>

            <div className="relative">

              <GraduationCap
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="qualification"
                required
                value={formData.qualification}
                onChange={handleChange}
                placeholder="Qualification"
                className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Email
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="student@email.com"
                className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>

          </div>

          {/* Phone */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Phone
            </label>

            <div className="relative">

              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>

          </div>
                    {/* Course */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Course
            </label>

            <div className="relative">

              <GraduationCap
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
                placeholder="MERN Stack"
                className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>

          </div>

          {/* Batch */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Batch
            </label>

            <div className="relative">

              <Calendar
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="batch"
                required
                value={formData.batch}
                onChange={handleChange}
                placeholder="2026"
                className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

            </div>

          </div>

          {/* Status */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Status
            </label>

            <div className="relative">

              <ShieldCheck
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>

            </div>

          </div>

        </div>

        {/* Address */}

        <div className="border-t border-slate-100 px-8 py-8">

          <label className="mb-2 block font-medium text-slate-700">
            Address
          </label>

          <div className="relative">

            <MapPin
              size={18}
              className="absolute left-4 top-5 text-slate-400"
            />

            <textarea
              rows={5}
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter student's complete address..."
              className="w-full rounded-2xl border border-slate-300 py-4 pl-12 pr-4 outline-none transition resize-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 border-t border-slate-100 bg-slate-50 px-8 py-6">

          <Link
            to="/students"
            className="w-full sm:w-auto rounded-2xl border border-slate-300 bg-white px-8 py-3 text-center font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader />
                Creating...
              </>
            ) : (
              <>
                <Save size={18} />
                Create Student
              </>
            )}
          </button>

        </div>

      </form>

    </div>
  );
};

export default CreateStudent;