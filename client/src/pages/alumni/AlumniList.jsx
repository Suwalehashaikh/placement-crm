import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Building2,
  MapPin,
} from "lucide-react";

import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

import {
  getAlumni,
  deleteAlumni,
} from "../../services/alumniService";

const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const alumniPerPage = 5;

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const res = await getAlumni();

      setAlumni(res.data || res);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch alumni");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this alumni record?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAlumni(id);

      setAlumni((prev) =>
        prev.filter((item) => item._id !== id)
      );

      toast.success("Alumni deleted successfully");
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete alumni");
    }
  };

  const filteredAlumni = useMemo(() => {
    if (!search.trim()) return alumni;

    return alumni.filter(
      (item) =>
        item.companyName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.jobRole
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.location
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search, alumni]);

  const totalPages = Math.ceil(
    filteredAlumni.length / alumniPerPage
  );

  const startIndex =
    (currentPage - 1) * alumniPerPage;

  const paginatedAlumni =
    filteredAlumni.slice(
      startIndex,
      startIndex + alumniPerPage
    );

  if (loading) {
    return (
      <Loader text="Loading Alumni..." />
    );
  }

  return (
    <div>

      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Alumni
          </h1>

          <p className="mt-1 text-slate-500">
            Manage placed alumni records.
          </p>

        </div>

        <Link
          to="/alumni/create"
          className="inline-flex w-fit items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-medium text-white shadow-lg transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Alumni
        </Link>

      </div>

      {/* Search */}

      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-4">

        <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3">

          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Search company, role or location..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-transparent outline-none"
          />

        </div>

      </div>

      {/* Empty State */}

      {filteredAlumni.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center">

          <Building2
            size={60}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-5 text-2xl font-bold text-slate-800">
            No Alumni Found
          </h2>

          <p className="mt-2 text-slate-500">
            Start by adding your first alumni record.
          </p>

        </div>
      )}

      {filteredAlumni.length > 0 && (
        <>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="min-w-full">              <thead className="bg-slate-50">

                <tr>

                  <th className="p-5 text-left font-semibold text-slate-600">
                    Company
                  </th>

                  <th className="p-5 text-left font-semibold text-slate-600">
                    Job Role
                  </th>

                  <th className="p-5 text-left font-semibold text-slate-600">
                    Passing Year
                  </th>

                  <th className="p-5 text-left font-semibold text-slate-600">
                    Location
                  </th>

                  <th className="p-5 text-center font-semibold text-slate-600">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {paginatedAlumni.map((item) => (

                  <tr
                    key={item._id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >

                    <td className="p-5">

                      <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">

                          <Building2 size={20} />

                        </div>

                        <div>

                          <h3 className="font-semibold text-slate-900">
                            {item.companyName}
                          </h3>

                          <p className="text-sm text-slate-500">
                            Company
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="p-5">

                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                        {item.jobRole}
                      </span>

                    </td>

                    <td className="p-5 font-medium text-slate-700">
                      {item.passingYear}
                    </td>

                    <td className="p-5">

                      <div className="flex items-center gap-2 text-slate-600">

                        <MapPin size={16} />

                        {item.location}

                      </div>

                    </td>

                    <td className="p-5">

                      <div className="flex justify-center gap-3">

                        <Link
                          to={`/alumni/${item._id}`}
                          className="rounded-xl p-2 transition hover:bg-green-100 hover:text-green-600"
                        >
                          <Eye size={18} />
                        </Link>

                        <Link
                          to={`/alumni/edit/${item._id}`}
                          className="rounded-xl p-2 transition hover:bg-blue-100 hover:text-blue-600"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(item._id)
                          }
                          className="rounded-xl p-2 text-red-500 transition hover:bg-red-100"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </>
      )}

    </div>
  );
};

export default AlumniList;
              