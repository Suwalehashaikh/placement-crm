import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  ArrowLeft,
  GraduationCap,
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  Save,
} from "lucide-react";

import toast from "react-hot-toast";

import { getStudents } from "../../services/studentService";
import { createAlumni } from "../../services/alumniService";

const CreateAlumni = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    student: "",
    passingYear: "",
    companyName: "",
    jobRole: "",
    location: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();

      setStudents(res || []);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load students");
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

      await createAlumni(formData);

      toast.success("Alumni created successfully");

      navigate("/alumni");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to create alumni"
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
            Create Alumni
          </h1>

          <p className="mt-2 text-slate-500">
            Add a new alumni placement record.
          </p>

        </div>

        <Link
          to="/alumni"
          className="flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
      >

        <div className="grid gap-6 md:grid-cols-2">

          {/* Student */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Student
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4">

              <GraduationCap
                size={18}
                className="text-indigo-600"
              />

              <select
                name="student"
                value={formData.student}
                onChange={handleChange}
                className="h-14 w-full bg-transparent outline-none"
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

          </div>

          {/* Passing Year */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Passing Year
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4">

              <Calendar
                size={18}
                className="text-indigo-600"
              />

              <input
                type="number"
                name="passingYear"
                placeholder="2026"
                value={formData.passingYear}
                onChange={handleChange}
                className="h-14 w-full outline-none"
                required
              />

            </div>

          </div>
                    {/* Company Name */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Company Name
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4">

              <Building2
                size={18}
                className="text-indigo-600"
              />

              <input
                type="text"
                name="companyName"
                placeholder="Google"
                value={formData.companyName}
                onChange={handleChange}
                className="h-14 w-full outline-none"
                required
              />

            </div>

          </div>

          {/* Job Role */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Job Role
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4">

              <Briefcase
                size={18}
                className="text-indigo-600"
              />

              <input
                type="text"
                name="jobRole"
                placeholder="Frontend Developer"
                value={formData.jobRole}
                onChange={handleChange}
                className="h-14 w-full outline-none"
                required
              />

            </div>

          </div>

          {/* Location */}

          <div className="md:col-span-2">

            <label className="mb-2 block font-medium text-slate-700">
              Location
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4">

              <MapPin
                size={18}
                className="text-indigo-600"
              />

              <input
                type="text"
                name="location"
                placeholder="Bangalore, India"
                value={formData.location}
                onChange={handleChange}
                className="h-14 w-full outline-none"
                required
              />

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">

          <Link
            to="/alumni"
            className="rounded-2xl border border-slate-300 px-6 py-3 text-center font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Save size={18} />

            {loading
              ? "Creating Alumni..."
              : "Create Alumni"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default CreateAlumni;