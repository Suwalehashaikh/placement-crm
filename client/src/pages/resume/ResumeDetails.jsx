import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  FileText,
  ExternalLink,
  User,
  Mail,
  Phone,
  GraduationCap,
  CheckCircle,
} from "lucide-react";

import Loader from "../../components/common/Loader";

import { getResumeById } from "../../services/resumeService";

const ResumeDetails = () => {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await getResumeById(id);

      setResume(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loader text="Loading Resume..." />
    );
  }

  if (!resume) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <h2 className="text-xl text-slate-500">
          Resume not found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

        <div>

          <Link
            to="/resumes"
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition mb-3"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Resume Details
          </h1>

          <p className="mt-2 text-slate-500">
            View student resume information
          </p>

        </div>

        <Link
          to={`/resumes/edit/${resume._id}`}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl transition w-fit"
        >
          <Pencil size={18} />
          Edit Resume
        </Link>

      </div>

      {/* Card */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <FileText
                size={34}
                className="text-white"
              />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                {resume.name}
              </h2>

              <p className="text-indigo-100">
                Resume Information
              </p>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                    <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <User size={18} className="text-indigo-600" />
              <span className="text-slate-500">Name</span>
            </div>

            <h3 className="font-semibold text-lg">
              {resume.name}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Mail size={18} className="text-indigo-600" />
              <span className="text-slate-500">Email</span>
            </div>

            <h3 className="font-semibold">
              {resume.email}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Phone size={18} className="text-indigo-600" />
              <span className="text-slate-500">Phone</span>
            </div>

            <h3 className="font-semibold">
              {resume.phone}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap size={18} className="text-indigo-600" />
              <span className="text-slate-500">Course</span>
            </div>

            <h3 className="font-semibold">
              {resume.course}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={18} className="text-indigo-600" />
              <span className="text-slate-500">Status</span>
            </div>

            <span className="inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
              {resume.status}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-indigo-600" />
              <span className="text-slate-500">Resume File</span>
            </div>

            <a
              href={resume.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 transition"
            >
              <ExternalLink size={18} />
              Open Resume
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ResumeDetails;