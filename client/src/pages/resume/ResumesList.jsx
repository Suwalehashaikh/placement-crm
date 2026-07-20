import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getResumes,
  deleteResume,
} from "../../services/resumeService";
import Loader from "../../components/common/Loader";

const ResumesList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await getResumes();

      setResumes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this resume?"
      );

    if (!confirmDelete) return;

    try {
      await deleteResume(id);

      fetchResumes();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <Loader
        text="Loading resumes..."
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Resumes
        </h1>

        <Link
          to="/resumes/create"
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl"
        >
          Add Resume
        </Link>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden border">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-4 text-left">
                Student
              </th>

              <th className="p-4 text-left">
                Course
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Resume
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
                        {resumes.map((resume) => (
              <tr
                key={resume._id}
                className="border-t"
              >
                <td className="p-4">
                  {resume.name}
                </td>

                <td className="p-4">
                  {resume.course}
                </td>

                <td className="p-4">
                  {resume.status}
                </td>

                <td className="p-4">
                  <a
                    href={resume.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    View
                  </a>
                </td>

                <td className="p-4 flex gap-3">
                  <Link
                    to={`/resumes/${resume._id}`}
                    className="text-green-600"
                  >
                    View
                  </Link>

                  <Link
                    to={`/resumes/edit/${resume._id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        resume._id
                      )
                    }
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResumesList;