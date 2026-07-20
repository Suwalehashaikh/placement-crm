import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  ArrowLeft,
  Clock3,
  IndianRupee,
  FileText,
  BadgeCheck,
  Pencil,
} from "lucide-react";

import Loader from "../../components/common/Loader";
import { getCourseById } from "../../services/courseService";

const CourseDetails = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      const res = await getCourseById(id);

      // Change this if your API returns a different structure
      setCourse(res.data || res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading Course..." />;
  }

  if (!course) {
    return (
      <div className="flex h-[60vh] items-center justify-center rounded-3xl border border-slate-200 bg-white">
        <h2 className="text-xl font-semibold text-slate-500">
          Course not found
        </h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Course Details
          </h1>

          <p className="mt-2 text-slate-500">
            Complete course information
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/courses"
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <Link
            to={`/courses/edit/${course._id}`}
            className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            <Pencil size={18} />
            Edit
          </Link>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-10 flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 text-3xl font-bold text-white shadow-lg">
            📚
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {course.courseName}
            </h2>

            <p className="mt-2 text-slate-500">
              Course Overview
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Duration */}
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="mb-3 flex items-center gap-3">
              <Clock3 size={20} className="text-indigo-600" />
              <p className="font-medium text-slate-500">
                Duration
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              {course.duration}
            </h3>
          </div>

          {/* Fee */}
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="mb-3 flex items-center gap-3">
              <IndianRupee size={20} className="text-green-600" />
              <p className="font-medium text-slate-500">
                Course Fee
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              ₹{course.fee}
            </h3>
          </div>

          {/* Status */}
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="mb-3 flex items-center gap-3">
              <BadgeCheck size={20} className="text-blue-600" />
              <p className="font-medium text-slate-500">
                Status
              </p>
            </div>

            <span
              className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                course.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {course.status}
            </span>
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-slate-200 p-6 md:col-span-2">
            <div className="mb-3 flex items-center gap-3">
              <FileText size={20} className="text-indigo-600" />
              <p className="font-medium text-slate-500">
                Description
              </p>
            </div>

            <p className="leading-8 text-slate-700">
              {course.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;