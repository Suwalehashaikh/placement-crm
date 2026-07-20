import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Mail,
  Phone,
  GraduationCap,
  Users,
  MapPin,
  User,
  Calendar,
  BadgeCheck,
} from "lucide-react";

import Loader from "../../components/common/Loader";
import { getStudentById } from "../../services/studentService";

const StudentDetails = () => {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await getStudentById(id);

      setStudent(res.data || res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading student..." />;
  }

  if (!student) {
    return (
      <div className="flex h-[60vh] items-center justify-center rounded-3xl bg-white border border-slate-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Student Not Found
          </h2>

          <p className="mt-2 text-slate-500">
            This student record doesn't exist.
          </p>

          <Link
            to="/students"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
          >
            <ArrowLeft size={18} />
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  const infoCards = [
    {
      icon: Mail,
      title: "Email",
      value: student.email,
    },
    {
      icon: Phone,
      title: "Phone",
      value: student.phone,
    },
    {
      icon: User,
      title: "Gender",
      value: student.gender,
    },
    {
      icon: Calendar,
      title: "Age",
      value: student.age,
    },
    {
      icon: GraduationCap,
      title: "Qualification",
      value: student.qualification,
    },
    {
      icon: GraduationCap,
      title: "Course",
      value: student.course,
    },
    {
      icon: Users,
      title: "Batch",
      value: student.batch,
    },
    {
      icon: BadgeCheck,
      title: "Status",
      value: student.status,
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <Link
            to="/students"
            className="mb-4 inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to Students
          </Link>

          <h1 className="text-3xl font-bold text-slate-900">
            Student Details
          </h1>

          <p className="mt-2 text-slate-500">
            Complete student profile information.
          </p>
        </div>

        <Link
          to={`/students/edit/${student._id}`}
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-medium text-white shadow-lg transition hover:bg-indigo-700"
        >
          <Pencil size={18} />
          Edit Student
        </Link>
      </div>

      {/* Profile Card */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="flex flex-col gap-6 md:flex-row md:items-center">

          <img
            src={
              student.profileImage ||
              `https://ui-avatars.com/api/?background=4f46e5&color=fff&name=${encodeURIComponent(
                student.name
              )}`
            }
            alt={student.name}
            className="h-28 w-28 rounded-3xl object-cover shadow-lg"
          />

          <div className="flex-1">

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  {student.name}
                </h2>

                <p className="mt-1 text-slate-500">
                  {student.email}
                </p>
              </div>

              <span className="inline-flex w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                {student.status}
              </span>

            </div>

          </div>

        </div>
      </div>
            {/* Information */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {infoCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Icon size={22} />
              </div>

              <p className="text-sm text-slate-500">
                {item.title}
              </p>

              <h3 className="mt-2 break-words text-lg font-semibold text-slate-900">
                {item.value || "-"}
              </h3>
            </div>
          );
        })}

      </div>

      {/* Address */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <MapPin size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Address
            </h2>

            <p className="text-sm text-slate-500">
              Student residential address
            </p>
          </div>

        </div>

        <p className="leading-7 text-slate-700">
          {student.address || "No address available"}
        </p>

      </div>

    </div>
  );
};

export default StudentDetails;