import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  Search,
} from "lucide-react";

import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

import {
  getPlacements,
  deletePlacement,
} from "../../services/placementService";

const PlacementsList = () => {
  const [placements, setPlacements] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const placementsPerPage = 5;

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const res =
        await getPlacements();

      setPlacements(res.data || []);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to fetch placements"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this placement?"
      );

    if (!confirmDelete) return;

    try {
      await deletePlacement(id);

      setPlacements((prev) =>
        prev.filter(
          (item) =>
            item._id !== id
        )
      );

      toast.success(
        "Placement deleted successfully"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to delete placement"
      );
    }
  };

  const filteredPlacements =
    useMemo(() => {
      if (!search.trim())
        return placements;

      return placements.filter(
        (placement) =>
          placement.companyName
            ?.toLowerCase()
            .includes(
              search
                .toLowerCase()
                .trim()
            ) ||
          placement.jobRole
            ?.toLowerCase()
            .includes(
              search
                .toLowerCase()
                .trim()
            )
      );
    }, [placements, search]);

  const totalPages =
    Math.ceil(
      filteredPlacements.length /
        placementsPerPage
    );

  const startIndex =
    (currentPage - 1) *
    placementsPerPage;

  const paginatedPlacements =
    filteredPlacements.slice(
      startIndex,
      startIndex +
        placementsPerPage
    );

  if (loading) {
    return (
      <Loader text="Loading placements..." />
    );
  }

  return (
    <div>

      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Placements
          </h1>

          <p className="mt-1 text-slate-500">
            Manage all placement records.
          </p>

        </div>

        <Link
          to="/placements/create"
          className="flex w-fit items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Placement
        </Link>

      </div>

      {/* Search */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">

        <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search placement..."
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );

              setCurrentPage(1);
            }}
            className="w-full bg-transparent outline-none"
          />

        </div>

      </div>

      {/* Empty */}

      {filteredPlacements.length ===
        0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">

          <h2 className="text-xl font-semibold">
            No Placements Found
          </h2>

          <p className="mt-2 text-slate-500">
            Create your first placement.
          </p>

        </div>
      )}

      {filteredPlacements.length >
        0 && (
        <>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="p-5 text-left">
                    Company
                  </th>

                  <th className="p-5 text-left">
                    Role
                  </th>

                  <th className="p-5 text-left">
                    Package
                  </th>

                  <th className="p-5 text-left">
                    Status
                  </th>

                  <th className="p-5 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>
                                {paginatedPlacements.map(
                  (placement) => (
                    <tr
                      key={placement._id}
                      className="border-t transition hover:bg-slate-50"
                    >
                      <td className="p-5 font-semibold">
                        {placement.companyName}
                      </td>

                      <td className="p-5">
                        {placement.jobRole}
                      </td>

                      <td className="p-5">
                        ₹{placement.package} LPA
                      </td>

                      <td className="p-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            placement.status ===
                            "Joined"
                              ? "bg-green-100 text-green-700"
                              : placement.status ===
                                "Selected"
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {placement.status}
                        </span>
                      </td>

                      <td className="p-5">
                        <div className="flex justify-center gap-3">

                          <Link
                            to={`/placements/${placement._id}`}
                            className="rounded-lg p-2 transition hover:bg-slate-100"
                          >
                            <Eye size={18} />
                          </Link>

                          <Link
                            to={`/placements/edit/${placement._id}`}
                            className="rounded-lg p-2 transition hover:bg-slate-100"
                          >
                            <Pencil size={18} />
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(
                                placement._id
                              )
                            }
                            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={
              setCurrentPage
            }
          />
        </>
      )}
    </div>
  );
};

export default PlacementsList;