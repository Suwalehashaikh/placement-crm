import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  MapPin,
  BadgeCheck,
  Save,
} from "lucide-react";

import Loader from "../../components/common/Loader";

import {
  getStudentById,
  updateStudent,
} from "../../services/studentService";

const EditStudent = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(true);

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

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      setFetching(true);

      const student = await getStudentById(id);

      setFormData({
        name: student.name || "",
        gender: student.gender || "Male",
        age: student.age || "",
        qualification:
          student.qualification || "",
        email: student.email || "",
        phone: student.phone || "",
        address: student.address || "",
        course: student.course || "",
        batch: student.batch || "",
        status: student.status || "Active",
      });
    } catch (error) {
      console.log(error);

      toast.error("Failed to load student");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateStudent(id, formData);

      toast.success(
        "Student updated successfully"
      );

      navigate("/students");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update student"
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Loader text="Loading Student..." />
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Edit Student
          </h1>

          <p className="mt-2 text-slate-500">
            Update student information.
          </p>

        </div>

      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* Personal Information */}

        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm">

          <div className="border-b border-slate-100 px-8 py-6">

            <h2 className="text-xl font-bold text-slate-900">
              Personal Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Basic student details
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">

            {/* Name */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
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
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
                />

              </div>

            </div>

            {/* Gender */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 p-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

            </div>

            {/* Age */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 p-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
              />

            </div>

            {/* Qualification */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Qualification
              </label>

              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 p-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
              />

            </div>
                        {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
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
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
                />

              </div>

            </div>

            {/* Phone */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
                />

              </div>

            </div>

          </div>

        </div>

        {/* Academic Information */}

        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm">

          <div className="border-b border-slate-100 px-8 py-6">

            <h2 className="text-xl font-bold text-slate-900">
              Academic Information
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">

            {/* Course */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
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
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
                />

              </div>

            </div>

            {/* Batch */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
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
                  value={formData.batch}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
                />

              </div>

            </div>

          </div>

        </div>

        {/* Address & Status */}

        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm">

          <div className="border-b border-slate-100 px-8 py-6">

            <h2 className="text-xl font-bold text-slate-900">
              Additional Details
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">

            {/* Address */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold">
                Address
              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-4 top-5 text-slate-400"
                />

                <textarea
                  rows={4}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none resize-none"
                />

              </div>

            </div>

            {/* Status */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Status
              </label>

              <div className="relative">

                <BadgeCheck
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
                >
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Inactive</option>
                </select>

              </div>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row justify-end gap-4">

          <button
            type="button"
            onClick={() => navigate("/students")}
            className="rounded-2xl border border-slate-300 px-6 py-3 font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader />
                Updating...
              </>
            ) : (
              <>
                <Save size={18} />
                Update Student
              </>
            )}
          </button>

        </div>

      </form>

    </div>
  );
};

export default EditStudent;