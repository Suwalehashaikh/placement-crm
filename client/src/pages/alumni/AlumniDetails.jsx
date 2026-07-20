import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Pencil,
  Building2,
  Briefcase,
  Calendar,
  MapPin,
} from "lucide-react";

import Loader from "../../components/common/Loader";
import { getAlumniById } from "../../services/alumniService";

const AlumniDetails = () => {
  const { id } = useParams();

  const [alumni, setAlumni] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlumni();
  }, [id]);

  const fetchAlumni = async () => {
    try {
      const res = await getAlumniById(id);

      // Update this if your API response structure is different
      setAlumni(res.data || res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading Alumni..." />;
  }

  if (!alumni) {
    return (
      <div className="flex h-[60vh] items-center justify-center rounded-3xl border border-slate-200 bg-white">
        <h2 className="text-xl font-semibold text-slate-500">
          Alumni not found
        </h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link
          to="/alumni"
          className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-600 transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <Link
          to={`/alumni/edit/${alumni._id}`}
          className="flex w-fit items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-medium text-white shadow-lg transition hover:bg-indigo-700"
        >
          <Pencil size={18} />
          Edit Alumni
        </Link>
      </div>

      {/* Profile Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-10 flex flex-col items-center gap-6 md:flex-row">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600">
            <Building2 size={42} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {alumni.companyName}
            </h1>

            <p className="mt-2 text-lg text-slate-500">
              {alumni.jobRole}
            </p>

            <span className="mt-4 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              Alumni Record
            </span>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="mb-3 flex items-center gap-3">
              <Briefcase size={20} className="text-indigo-600" />
              <h3 className="font-semibold text-slate-800">Job Role</h3>
            </div>

            <p className="text-lg font-medium text-slate-700">
              {alumni.jobRole}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="mb-3 flex items-center gap-3">
              <Calendar size={20} className="text-indigo-600" />
              <h3 className="font-semibold text-slate-800">
                Passing Year
              </h3>
            </div>

            <p className="text-lg font-medium text-slate-700">
              {alumni.passingYear}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6 md:col-span-2">
            <div className="mb-3 flex items-center gap-3">
              <MapPin size={20} className="text-indigo-600" />
              <h3 className="font-semibold text-slate-800">
                Location
              </h3>
            </div>

            <p className="text-lg font-medium text-slate-700">
              {alumni.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniDetails;