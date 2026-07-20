import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import { getStudents } from "../../services/studentService";
import { createPlacement } from "../../services/placementService";

const CreatePlacement = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    student: "",
    companyName: "",
    jobRole: "",
    package: "",
    location: "",
    placementDate: "",
    status: "Selected",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();

      setStudents(res.data || res || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load students");
      setStudents([]);
    }
  };

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

      await createPlacement(formData);

      toast.success("Placement created successfully");
      navigate("/placements");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to create placement"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <button
            onClick={() => navigate("/placements")}
            className="mb-4 flex items-center gap-2 text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to Placements
          </button>

          <h1 className="text-3xl font-bold text-slate-900">
            Create Placement
          </h1>

          <p className="mt-2 text-slate-500">
            Add a new placement record for a student.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-8 py-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Placement Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Fill all required fields carefully.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2"
        >
          {/* Student */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Student
            </label>

            <select
              name="student"
              value={formData.student}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option
                  key={student._id}
                  value={student._id}
                >
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          {/* Company */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Company Name
            </label>

            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Infosys"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          {/* Job Role */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Role
            </label>

            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              placeholder="Frontend Developer"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          {/* Package */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Package (LPA)
            </label>

            <input
              type="number"
              name="package"
              value={formData.package}
              onChange={handleChange}
              placeholder="6"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Bangalore"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          {/* Placement Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Placement Date
            </label>

            <input
              type="date"
              name="placementDate"
              value={formData.placementDate}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="Selected">Selected</option>
              <option value="Joined">Joined</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 border-t border-slate-200 pt-6 md:col-span-2">
            <button
              type="button"
              onClick={() => navigate("/placements")}
              className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating..." : "Create Placement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlacement;