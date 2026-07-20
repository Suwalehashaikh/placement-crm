import {
  Clock3,
  Activity,
} from "lucide-react";

const RecentActivity = ({
  activities = [],
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Recent Activity
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Latest updates from your CRM
          </p>

        </div>

        <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center">

          <Activity
            className="text-indigo-600"
            size={22}
          />

        </div>

      </div>

      {/* Empty */}

      {activities.length === 0 ? (

        <div className="flex h-64 flex-col items-center justify-center">

          <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center">

            <Clock3
              size={28}
              className="text-slate-400"
            />

          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-700">
            No Recent Activity
          </h3>

          <p className="mt-2 text-center text-sm text-slate-400 max-w-xs">
            Recent student registrations,
            placements and updates will
            appear here.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {activities.map((item, index) => (

            <div
              key={index}
              className="group relative flex gap-4"
            >

              {/* Timeline */}

              <div className="flex flex-col items-center">

                <div className="h-4 w-4 rounded-full bg-indigo-600 ring-4 ring-indigo-100 transition group-hover:scale-110"></div>

                {index !==
                  activities.length - 1 && (
                  <div className="mt-2 h-full w-[2px] bg-slate-200"></div>
                )}

              </div>

              {/* Content */}

              <div className="flex-1 rounded-2xl border border-slate-100 p-4 transition-all group-hover:border-indigo-100 group-hover:bg-slate-50">

                <div className="flex items-center justify-between">

                  <h4 className="font-semibold text-slate-800">
                    {item.title}
                  </h4>

                  <span className="text-xs text-slate-400">
                    {item.date}
                  </span>

                </div>

                {item.description && (

                  <p className="mt-2 text-sm text-slate-500">
                    {item.description}
                  </p>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default RecentActivity;