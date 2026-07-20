const Loader = ({
  text = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />

      <p className="mt-4 text-slate-500">
        {text}
      </p>
    </div>
  );
};

export default Loader;