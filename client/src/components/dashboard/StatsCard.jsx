import { TrendingUp } from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon,
  growth,
}) => {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -top-10
        -right-10
        h-36
        w-36
        rounded-full
        bg-indigo-100
        blur-3xl
        opacity-50
        transition-all
        duration-500
        group-hover:scale-125
      "
      />

      {/* Top */}

      <div className="relative flex justify-between items-start">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            {value || 0}
          </h2>

        </div>

        <div
          className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-indigo-500
          to-violet-600
          text-white
          shadow-lg
          transition-transform
          duration-300
          group-hover:rotate-6
        "
        >
          {icon}
        </div>

      </div>

      {/* Bottom */}

      <div className="mt-8 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="rounded-full bg-emerald-100 p-1">

            <TrendingUp
              size={14}
              className="text-emerald-600"
            />

          </div>

          <span className="text-sm font-semibold text-emerald-600">
            {growth}
          </span>

        </div>

        <span className="text-xs text-slate-400">
          Compared to last month
        </span>

      </div>
    </div>
  );
};

export default StatsCard;