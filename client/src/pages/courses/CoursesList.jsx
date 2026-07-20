import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  Search,
  BookOpen,
  Clock3,
  IndianRupee,
} from "lucide-react";

import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

import {
  getCourses,
  deleteCourse,
} from "../../services/courseService";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 5;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();

      // Update this if your API response is different
      setCourses(res.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCourse(id);

      setCourses((prev) =>
        prev.filter((course) => course._id !== id)
      );

      toast.success("Course deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete course");
    }
  };

  const filteredCourses = useMemo(() => {
    if (!search.trim()) return courses;

    return courses.filter((course) =>
      course.courseName
        ?.toLowerCase()
        .includes(search.toLowerCase().trim())
    );
  }, [courses, search]);

  const totalPages = Math.ceil(
    filteredCourses.length / coursesPerPage
  );

  const startIndex =
    (currentPage - 1) * coursesPerPage;

  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  if (loading) {
    return <Loader text="Loading Courses..." />;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Courses
          </h1>

          <p className="mt-1 text-slate-500">
            Manage all available courses.
          </p>
        </div>

        <Link
          to="/courses/create"
          className="flex w-fit items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Course
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search courses..."
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
      {filteredCourses.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <BookOpen
            className="mx-auto mb-4 text-slate-400"
            size={50}
          />

          <h2 className="text-xl font-semibold">
            No Courses Found
          </h2>

          <p className="mt-2 text-slate-500">
            Add your first course to get started.
          </p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-5 text-left">
                    Course
                  </th>

                  <th className="p-5 text-left">
                    Duration
                  </th>

                  <th className="p-5 text-left">
                    Fee
                  </th>

                  <th className="p-5 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedCourses.map((course) => (
                  <tr
                    key={course._id}
                    className="border-t transition hover:bg-slate-50"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                          <BookOpen size={22} />
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {course.courseName}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {course.status || "Active"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <Clock3
                          size={16}
                          className="text-indigo-600"
                        />
                        {course.duration}
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-1 font-semibold text-slate-900">
                        <IndianRupee
                          size={16}
                          className="text-green-600"
                        />
                        {course.fee}
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/courses/${course._id}`}
                          className="rounded-xl p-2 transition hover:bg-slate-100"
                        >
                          <Eye size={18} />
                        </Link>

                        <Link
                          to={`/courses/edit/${course._id}`}
                          className="rounded-xl p-2 transition hover:bg-slate-100"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(course._id)
                          }
                          className="rounded-xl p-2 text-red-500 transition hover:bg-red-50"
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

          {/* Pagination */}
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

export default CoursesList;