type PaginationProps = {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};


const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPrevious, onNext }) => (
  <div className="flex justify-end items-center gap-2 mt-4 pr-4">
    <button
      className={`px-3 py-1 rounded text-sm transition ${
        page === 1
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      onClick={onPrevious}
      disabled={page === 1}
    >
      Previous
    </button>
    <span className="text-sm font-medium text-gray-800">Page {page}</span>
    <button
      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
      onClick={onNext}
      disabled={page >= totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;