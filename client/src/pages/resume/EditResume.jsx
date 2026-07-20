import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Save,
} from "lucide-react";

import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";

import {
  getResumeById,
  updateResume,
} from "../../services/resumeService";

const EditResume = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      course: "",
      resumeUrl: "",
      status: "Pending",
    });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res =
        await getResumeById(id);

      setFormData(res.data || {});
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load resume"
      );
    }
  };

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

      await updateResume(
        id,
        formData
      );

      toast.success(
        "Resume updated successfully"
      );

      navigate("/resumes");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to update resume"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition mb-3"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Edit Resume
          </h1>

          <p className="mt-2 text-slate-500">
            Update resume details
          </p>

        </div>

        <div className="hidden lg:flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-100">
          <FileText
            size={40}
            className="text-indigo-600"
          />
        </div>

      </div>

      {/* Card */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6">

          <h2 className="text-2xl font-bold text-white">
            Resume Information
          </h2>

          <p className="mt-1 text-indigo-100">
            Edit resume details
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8"
        >

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course || ""}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
                    <input
            type="text"
            name="resumeUrl"
            placeholder="Resume URL"
            value={formData.resumeUrl || ""}
            onChange={handleChange}
            className="md:col-span-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />

          <select
            name="status"
            value={formData.status || "Pending"}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Reviewed">
              Reviewed
            </option>

            <option value="Shortlisted">
              Shortlisted
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>

          <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={() =>
                navigate("/resumes")
              }
              className="rounded-2xl border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Resume
                </>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditResume;