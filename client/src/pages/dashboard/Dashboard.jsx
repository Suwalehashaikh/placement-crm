import { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  GraduationCap,
  UserCheck,
} from "lucide-react";

import PlacementChart from "../../components/dashboard/PlacementChart";
import PlacementStatusChart from "../../components/dashboard/PlacementStatusChart";
import StatsCard from "../../components/dashboard/StatsCard";
import { getDashboardData } from "../../services/dashboardService";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();
      setDashboardData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-slate-500 text-lg font-medium">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};

  const recent = dashboardData?.recent || {};

  const chartData =
    dashboardData?.charts?.placementChartData || [];

  const statusChartData =
    dashboardData?.charts?.statusChartData || [];

  return (
    <div className="space-y-8">

      {/* Welcome Banner */}

<div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-xl">

  <p className="uppercase tracking-[4px] text-indigo-200 text-sm">
    Placement CRM
  </p>

  <h1 className="mt-2 text-4xl font-bold">
    Welcome back,
    <span className="ml-2 text-yellow-300">
      {user?.name || "Admin"}
    </span>
  </h1>

  <p className="mt-4 text-indigo-100 max-w-2xl leading-7">
    Manage students, resumes, placements, alumni and courses
    from one centralized dashboard.
  </p>

</div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatsCard
          title="Students"
          value={stats.totalStudents}
          icon={<Users size={24} />}
          growth="+12%"
        />

        <StatsCard
          title="Courses"
          value={stats.totalCourses}
          icon={<GraduationCap size={24} />}
          growth="+4%"
        />

        <StatsCard
          title="Placements"
          value={stats.totalPlacements}
          icon={<Briefcase size={24} />}
          growth="+18%"
        />

        <StatsCard
          title="Alumni"
          value={stats.totalAlumni}
          icon={<UserCheck size={24} />}
          growth="+6%"
        />

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <PlacementChart chartData={chartData} />

        <PlacementStatusChart
          chartData={statusChartData}
        />

      </div>

      {/* Recent Section */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Recent Students */}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-bold">
              Recent Students
            </h2>

            <span className="text-sm text-indigo-600 font-medium">
              {recent.students?.length || 0} Records
            </span>

          </div>

          {recent.students?.length ? (
            <div className="space-y-4">

              {recent.students.map((student) => (

                <div
                  key={student._id}
                  className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-none"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={`https://ui-avatars.com/api/?background=4f46e5&color=fff&name=${student.name}`}
                      alt={student.name}
                      className="w-11 h-11 rounded-full"
                    />

                    <div>

                      <h4 className="font-semibold">
                        {student.name}
                      </h4>

                      <p className="text-sm text-slate-500">
                        {student.course || "No Course"}
                      </p>

                    </div>

                  </div>

                  <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                    Active
                  </span>

                </div>

              ))}

            </div>
          ) : (
            <p className="text-slate-400">
              No students available.
            </p>
          )}

        </div>

        {/* Recent Placements */}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-bold">
              Recent Placements
            </h2>

            <span className="text-sm text-green-600 font-medium">
              {recent.placements?.length || 0} Records
            </span>

          </div>

          {recent.placements?.length ? (
            <div className="space-y-4">

              {recent.placements.map((placement) => (

                <div
                  key={placement._id}
                  className="flex justify-between items-center border-b border-slate-100 pb-4 last:border-none"
                >

                  <div>

                    <h4 className="font-semibold">
                      {placement.companyName}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {placement.jobRole}
                    </p>

                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    {placement.status}
                  </span>

                </div>

              ))}

            </div>
          ) : (
            <p className="text-slate-400">
              No placements available.
            </p>
          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;