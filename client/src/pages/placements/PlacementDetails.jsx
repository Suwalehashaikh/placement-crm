import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  Briefcase,
  DollarSign,
  MapPin,
  Calendar,
  BadgeCheck,
  User,
} from "lucide-react";

import Loader from "../../components/common/Loader";

import { getPlacementById } from "../../services/placementService";

const PlacementDetails = () => {
  const { id } = useParams();

  const [placement, setPlacement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlacement();
  }, [id]);

  const fetchPlacement = async () => {
    try {
      const res = await getPlacementById(id);

      setPlacement(res.data || res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading placement..." />;
  }

  if (!placement) {
    return (
      <div className="py-20 text-center text-slate-500">
        Placement not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            to="/placements"
            className="mb-4 flex items-center gap-2 text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to Placements
          </Link>

          <h1 className="text-3xl font-bold text-slate-900">
            Placement Details
          </h1>

          <p className="mt-2 text-slate-500">
            Complete placement information.
          </p>
        </div>
      </div>


      {/* Main Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* Top Section */}
        <div className="border-b border-slate-100 p-8">

          <div className="flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">
              <Building2 size={34} />
            </div>

            <div>

              <h2 className="text-3xl font-bold text-slate-900">
                {placement.companyName}
              </h2>

              <p className="mt-2 text-slate-500">
                {placement.jobRole}
              </p>

              <span className="mt-4 inline-flex rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                {placement.status}
              </span>

            </div>

          </div>

        </div>


        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">


          {/* Student */}
          <div>
            <p className="mb-2 text-sm text-slate-500">
              Student
            </p>

            <div className="flex items-center gap-3">
              <User
                size={18}
                className="text-indigo-600"
              />

              <span className="font-semibold text-slate-800">
                {placement.student?.name || "N/A"}
              </span>
            </div>
          </div>


          {/* Package */}
          <div>
            <p className="mb-2 text-sm text-slate-500">
              Package
            </p>

            <div className="flex items-center gap-3">
              <DollarSign
                size={18}
                className="text-indigo-600"
              />

              <span className="font-semibold text-slate-800">
                {placement.package} LPA
              </span>
            </div>
          </div>


          {/* Job Role */}
          <div>
            <p className="mb-2 text-sm text-slate-500">
              Job Role
            </p>

            <div className="flex items-center gap-3">
              <Briefcase
                size={18}
                className="text-indigo-600"
              />

              <span className="font-semibold text-slate-800">
                {placement.jobRole}
              </span>
            </div>
          </div>


          {/* Location */}
          <div>
            <p className="mb-2 text-sm text-slate-500">
              Location
            </p>

            <div className="flex items-center gap-3">
              <MapPin
                size={18}
                className="text-indigo-600"
              />

              <span className="font-semibold text-slate-800">
                {placement.location}
              </span>
            </div>
          </div>


          {/* Placement Date */}
          <div>
            <p className="mb-2 text-sm text-slate-500">
              Placement Date
            </p>

            <div className="flex items-center gap-3">
              <Calendar
                size={18}
                className="text-indigo-600"
              />

              <span className="font-semibold text-slate-800">
                {placement.placementDate
                  ? new Date(
                      placement.placementDate
                    ).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>


          {/* Status */}
          <div>
            <p className="mb-2 text-sm text-slate-500">
              Status
            </p>

            <div className="flex items-center gap-3">
              <BadgeCheck
                size={18}
                className="text-indigo-600"
              />

              <span className="font-semibold text-slate-800">
                {placement.status}
              </span>
            </div>
          </div>


        </div>

      </div>

    </div>
  );
};

export default PlacementDetails;