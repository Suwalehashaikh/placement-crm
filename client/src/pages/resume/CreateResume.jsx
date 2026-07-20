import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";
import { createResume } from "../../services/resumeService";
import { getStudents } from "../../services/studentService";

const CreateResume = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    student: "",
    name: "",
    email: "",
    phone: "",
    course: "",
    resumeUrl: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load students");
    }
  };

  const handleStudentChange = (e) => {
    const studentId = e.target.value;

    const selectedStudent = students.find(
      (student) => student._id === studentId
    );

    setFormData((prev) => ({
      ...prev,
      student: studentId,
      name: selectedStudent?.name || "",
      email: selectedStudent?.email || "",
      phone: selectedStudent?.phone || "",
      course: selectedStudent?.course || "",
    }));
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

      await createResume(formData);

      toast.success("Resume created successfully");
      navigate("/resumes");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to create resume"
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
            Create Resume
          </h1>

          <p className="text-slate-500 mt-2">
            Create and manage student resumes
          </p>
        </div>

        <div className="hidden lg:flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-100">
          <FileText className="text-indigo-600" size={40} />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">
            Resume Information
          </h2>

          <p className="text-indigo-100 mt-1">
            Fill all required details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Student */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Student
              </label>

              <select
                name="student"
                value={formData.student}
                onChange={handleStudentChange}
                required
                disabled={loading}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                <option value="">Select Student</option>

                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Student Name */}
            <input
              type="text"
              value={formData.name}
              readOnly
              placeholder="Student Name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-slate-100"
            />

            {/* Email */}
            <input
              type="email"
              value={formData.email}
              readOnly
              placeholder="Email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-slate-100"
            />

            {/* Phone */}
            <input
              type="text"
              value={formData.phone}
              readOnly
              placeholder="Phone"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-slate-100"
            />

            {/* Course */}
            <input
              type="text"
              value={formData.course}
              readOnly
              placeholder="Course"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-slate-100"
            />

            {/* Resume URL */}
            <input
              type="text"
              name="resumeUrl"
              placeholder="Resume URL (Google Drive / Cloudinary)"
              value={formData.resumeUrl}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 md:col-span-2"
            />

            {/* Status */}
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* Buttons */}
            <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/resumes")}
                className="rounded-2xl border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader />
                    Creating...
                  </>
                ) : (
                  "Create Resume"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateResume;