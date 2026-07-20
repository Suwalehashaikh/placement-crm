import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  Search,
  Filter,
  Users,
  UserCheck,
  GraduationCap,
  Clock3,
} from "lucide-react";

import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

import {
  getStudents,
  deleteStudent,
} from "../../services/studentService";

import toast from "react-hot-toast";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 8;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();

      setStudents(res);
    } catch (err) {
      console.log(err);

      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this student permanently?"
      )
    )
      return;

    try {
      await deleteStudent(id);

      setStudents((prev) =>
        prev.filter((item) => item._id !== id)
      );

      toast.success("Student deleted");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  const filteredStudents = useMemo(() => {
    if (!search.trim()) return students;

    return students.filter(
      (student) =>
        student.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        student.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        student.course
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [students, search]);

  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  const startIndex =
    (currentPage - 1) * studentsPerPage;

  const paginatedStudents =
    filteredStudents.slice(
      startIndex,
      startIndex + studentsPerPage
    );

  if (loading)
    return (
      <Loader text="Loading Students..." />
    );

  return (
    <div className="space-y-8">

      {/* Page Header */}

      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Students
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all students from one place.
          </p>

        </div>

        <Link
          to="/students/create"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >
          <Plus size={18} />
          Add Student
        </Link>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Students
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {students.length}
              </h2>

            </div>

            <div className="rounded-2xl bg-indigo-100 p-4">

              <Users className="text-indigo-600" />

            </div>

          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Active
              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {
                  students.filter(
                    (s) =>
                      s.status === "Active"
                  ).length
                }

              </h2>

            </div>

            <div className="rounded-2xl bg-emerald-100 p-4">

              <UserCheck className="text-emerald-600" />

            </div>

          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Courses
              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {
                  new Set(
                    students.map((s) => s.course)
                  ).size
                }

              </h2>

            </div>

            <div className="rounded-2xl bg-orange-100 p-4">

              <GraduationCap className="text-orange-600" />

            </div>

          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {
                  students.filter(
                    (s) =>
                      s.status === "Pending"
                  ).length
                }

              </h2>

            </div>

            <div className="rounded-2xl bg-red-100 p-4">

              <Clock3 className="text-red-600" />

            </div>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-lg">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search student..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:bg-white"
            />

          </div>

          <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 hover:bg-slate-50">

            <Filter size={18} />

            Filters

          </button>

        </div>

      </div>
      
      {/* Empty State */}

      {filteredStudents.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">

          <Users
            size={60}
            className="mx-auto mb-5 text-slate-300"
          />

          <h2 className="text-2xl font-bold text-slate-800">
            No Students Found
          </h2>

          <p className="mt-3 text-slate-500">
            Try changing your search or add a new student.
          </p>

        </div>
      ) : (
        <>
          {/* Desktop Table */}

          <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-slate-50">

                  <tr className="text-left text-sm uppercase tracking-wide text-slate-500">

                    <th className="px-6 py-5">Student</th>

                    <th className="px-6 py-5">Course</th>

                    <th className="px-6 py-5">Batch</th>

                    <th className="px-6 py-5">Status</th>

                    <th className="px-6 py-5 text-center">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {paginatedStudents.map((student) => (

                    <tr
                      key={student._id}
                      className="border-t border-slate-100 transition hover:bg-slate-50"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                          <img
                            src={
                              student.profileImage ||
                              `https://ui-avatars.com/api/?background=4f46e5&color=fff&name=${encodeURIComponent(student.name)}`
                            }
                            alt={student.name}
                            className="h-12 w-12 rounded-2xl object-cover"
                          />

                          <div>

                            <h3 className="font-semibold text-slate-900">
                              {student.name}
                            </h3>

                            <p className="text-sm text-slate-500">
                              {student.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-5 font-medium">
                        {student.course}
                      </td>

                      <td className="px-6 py-5">
                        {student.batch}
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            student.status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : student.status === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {student.status}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <div className="flex items-center justify-center gap-2">

                          <Link
                            to={`/students/${student._id}`}
                            className="rounded-xl p-2 transition hover:bg-indigo-100 hover:text-indigo-600"
                          >
                            <Eye size={18} />
                          </Link>

                          <Link
                            to={`/students/edit/${student._id}`}
                            className="rounded-xl p-2 transition hover:bg-amber-100 hover:text-amber-600"
                          >
                            <Pencil size={18} />
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(student._id)
                            }
                            className="rounded-xl p-2 transition hover:bg-red-100 hover:text-red-600"
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

          {/* Mobile Cards */}

          <div className="space-y-5 lg:hidden">

            {paginatedStudents.map((student) => (

              <div
                key={student._id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >

                <div className="flex items-center gap-4">

                  <img
                    src={
                      student.profileImage ||
                      `https://ui-avatars.com/api/?background=4f46e5&color=fff&name=${encodeURIComponent(student.name)}`
                    }
                    alt={student.name}
                    className="h-14 w-14 rounded-2xl object-cover"
                  />

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate text-lg font-semibold text-slate-900">
                      {student.name}
                    </h3>

                    <p className="truncate text-sm text-slate-500">
                      {student.email}
                    </p>

                  </div>

                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

                  <div>

                    <p className="text-slate-400">
                      Course
                    </p>

                    <p className="font-semibold">
                      {student.course}
                    </p>

                  </div>

                  <div>

                    <p className="text-slate-400">
                      Batch
                    </p>

                    <p className="font-semibold">
                      {student.batch}
                    </p>

                  </div>

                </div>

                <div className="mt-5 flex items-center justify-between">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      student.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : student.status === "Pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {student.status}
                  </span>

                  <div className="flex gap-2">

                    <Link
                      to={`/students/${student._id}`}
                      className="rounded-xl bg-slate-100 p-2"
                    >
                      <Eye size={18} />
                    </Link>

                    <Link
                      to={`/students/edit/${student._id}`}
                      className="rounded-xl bg-slate-100 p-2"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(student._id)
                      }
                      className="rounded-xl bg-red-100 p-2 text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
          
          {/* Pagination */}

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentsList;


