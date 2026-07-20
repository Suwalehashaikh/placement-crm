import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-slate-700">
        {label}
      </p>

      <p className="mt-1 text-sm text-indigo-600 font-bold">
        {payload[0].value} Placements
      </p>
    </div>
  );
};

const PlacementChart = ({ chartData = [] }) => {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        p-6
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between mb-8">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Placement Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monthly placement performance
          </p>

        </div>

        <div className="rounded-xl bg-indigo-50 px-4 py-2">
          <p className="text-xs text-indigo-600 font-semibold">
            Monthly
          </p>
        </div>

      </div>

      {chartData.length === 0 ? (
        <div className="flex h-[350px] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">

              📊

            </div>

            <h3 className="font-semibold text-slate-700">
              No Analytics Yet
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Placement statistics will appear here.
            </p>

          </div>

        </div>
      ) : (
        <div className="h-[360px] w-full">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 0,
              }}
            >
              <CartesianGrid
                stroke="#e5e7eb"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                }}
              />

              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                }}
              />

              <Tooltip
                cursor={{
                  fill: "#eef2ff",
                  radius: 10,
                }}
                content={<CustomTooltip />}
              />

              <Bar
                dataKey="placements"
                radius={[12, 12, 0, 0]}
                fill="#4f46e5"
                maxBarSize={42}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>
      )}
    </div>
  );
};

export default PlacementChart;