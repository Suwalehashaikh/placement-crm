const EmptyState = ({
  title = "No Data Found",
  description = "Nothing to display",
}) => {
  return (
    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-700">
        {title}
      </h2>

      <p className="text-slate-500 mt-2">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;