import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

const PlacementStatusChart = ({
  chartData = [],
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Placement Status
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Current hiring distribution
          </p>

        </div>

        <div className="text-right">

          <p className="text-xs text-slate-400">
            Total
          </p>

          <h3 className="text-lg font-bold text-slate-800">
            {chartData.reduce(
              (acc, item) => acc + item.value,
              0
            )}
          </h3>

        </div>

      </div>

      {chartData.length === 0 ? (

        <div className="h-[360px] flex items-center justify-center text-slate-400">
          No status data available
        </div>

      ) : (

        <div className="grid xl:grid-cols-2 gap-6 items-center">

          {/* Chart */}

          <div className="h-[320px]">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* Custom Legend */}

          <div className="space-y-4">

            {chartData.map((item, index) => (

              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3"
              >

                <div className="flex items-center gap-3">

                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  <span className="font-medium text-slate-700">
                    {item.name}
                  </span>

                </div>

                <span className="font-semibold text-slate-900">
                  {item.value}
                </span>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
};

export default PlacementStatusChart;