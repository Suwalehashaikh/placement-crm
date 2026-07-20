import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  BookOpen,
  Clock3,
  IndianRupee,
  FileText,
  BadgeCheck,
  Save,
} from "lucide-react";

import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";

import { createCourse } from "../../services/courseService";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      courseName: "",
      duration: "",
      fee: "",
      description: "",
      status: "Active",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createCourse(formData);

      toast.success(
        "Course created successfully"
      );

      navigate("/courses");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to create course"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">

      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Create Course
          </h1>

          <p className="mt-2 text-slate-500">
            Add a new course to the CRM.
          </p>

        </div>

        <Link
          to="/courses"
          className="flex w-fit items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

      </div>

      {/* Form Card */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          <div className="grid gap-6 md:grid-cols-2">

            {/* Course Name */}

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Course Name
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4">

                <BookOpen
                  size={18}
                  className="text-indigo-600"
                />

                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  placeholder="MERN Stack"
                  className="h-14 w-full outline-none"
                  required
                />

              </div>

            </div>

            {/* Duration */}

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Duration
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4">

                <Clock3
                  size={18}
                  className="text-indigo-600"
                />

                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="6 Months"
                  className="h-14 w-full outline-none"
                  required
                />

              </div>

            </div>

            {/* Fee */}

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Course Fee
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4">

                <IndianRupee
                  size={18}
                  className="text-indigo-600"
                />

                <input
                  type="number"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  placeholder="45000"
                  className="h-14 w-full outline-none"
                  required
                />

              </div>

            </div>

            {/* Status */}

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Status
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4">

                <BadgeCheck
                  size={18}
                  className="text-indigo-600"
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="h-14 w-full bg-transparent outline-none"
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>

              </div>

            </div>
                        {/* Description */}

            <div className="md:col-span-2">

              <label className="mb-2 block font-medium text-slate-700">
                Description
              </label>

              <div className="flex gap-3 rounded-2xl border border-slate-300 px-4 py-4">

                <FileText
                  size={18}
                  className="mt-1 text-indigo-600"
                />

                <textarea
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write course description..."
                  className="w-full resize-none outline-none"
                />

              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">

            <Link
              to="/courses"
              className="rounded-2xl border border-slate-300 px-6 py-3 text-center font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Create Course
                </>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateCourse;