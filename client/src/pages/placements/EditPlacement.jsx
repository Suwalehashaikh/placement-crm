import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  Briefcase,
  DollarSign,
  MapPin,
  Calendar,
  BadgeCheck,
  Save,
} from "lucide-react";

import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";

import {
  getPlacementById,
  updatePlacement,
} from "../../services/placementService";

const EditPlacement = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      companyName: "",
      jobRole: "",
      package: "",
      location: "",
      placementDate: "",
      status: "Selected",
    });

  useEffect(() => {
    fetchPlacement();
  }, []);

  const fetchPlacement =
    async () => {
      try {
        const res =
          await getPlacementById(id);

        setFormData(res.data);
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load placement"
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

      await updatePlacement(
        id,
        formData
      );

      toast.success(
        "Placement updated successfully"
      );

      navigate("/placements");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to update placement"
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

          <Link
            to="/placements"
            className="mb-4 flex items-center gap-2 text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to Placements
          </Link>

          <h1 className="text-3xl font-bold text-slate-900">
            Edit Placement
          </h1>

          <p className="mt-2 text-slate-500">
            Update placement information.
          </p>

        </div>

      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 px-8 py-6">

          <h2 className="text-xl font-semibold">
            Placement Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Modify placement details.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2"
        >

          {/* Company */}

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
                value={
                  formData.companyName || ""
                }
                onChange={handleChange}
                placeholder="Company Name"
                className="h-14 w-full outline-none"
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
                value={
                  formData.jobRole || ""
                }
                onChange={handleChange}
                placeholder="Frontend Developer"
                className="h-14 w-full outline-none"
              />

            </div>

          </div>

          {/* Package */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Package (LPA)
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4">

              <DollarSign
                size={18}
                className="text-indigo-600"
              />

              <input
                type="number"
                name="package"
                value={
                  formData.package || ""
                }
                onChange={handleChange}
                placeholder="6"
                className="h-14 w-full outline-none"
              />

            </div>

          </div>
                    {/* Location */}

          <div>

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
                value={
                  formData.location || ""
                }
                onChange={handleChange}
                placeholder="Bangalore"
                className="h-14 w-full outline-none"
              />

            </div>

          </div>

          {/* Placement Date */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Placement Date
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4">

              <Calendar
                size={18}
                className="text-indigo-600"
              />

              <input
                type="date"
                name="placementDate"
                value={
                  formData.placementDate || ""
                }
                onChange={handleChange}
                className="h-14 w-full outline-none"
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
                value={
                  formData.status || ""
                }
                onChange={handleChange}
                className="h-14 w-full bg-transparent outline-none"
              >
                <option value="Selected">
                  Selected
                </option>

                <option value="Joined">
                  Joined
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

            </div>

          </div>

          {/* Buttons */}

          <div className="md:col-span-2 flex justify-end gap-4 border-t border-slate-200 pt-6">

            <Link
              to="/placements"
              className="rounded-2xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Placement
                </>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditPlacement;