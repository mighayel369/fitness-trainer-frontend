type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};


const Pagination: React.FC<PaginationProps> = ({   
  page,
  totalPages,
  onPageChange,
}) => {
if(totalPages<=0) return null

  return (
    <div className="flex justify-end items-center gap-2 mt-6 pr-4">
      <button
        className={`px-3 py-1 rounded text-sm transition ${
          page === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      <span className="text-sm font-medium text-gray-800">
        Page {page} of {totalPages}
      </span>

      <button
        className={`px-3 py-1 rounded text-sm transition ${
          page >= totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;