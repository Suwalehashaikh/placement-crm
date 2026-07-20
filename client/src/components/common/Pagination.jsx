const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="
          px-4 py-2
          bg-white
          border border-slate-200
          rounded-xl
          shadow-sm
          hover:bg-slate-50
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition
        "
      >
        Previous
      </button>

      <div className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-semibold">
        Page {currentPage} of {totalPages}
      </div>

      <button
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="
          px-4 py-2
          bg-white
          border border-slate-200
          rounded-xl
          shadow-sm
          hover:bg-slate-50
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition
        "
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
