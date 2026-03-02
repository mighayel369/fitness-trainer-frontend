
import { FaArrowRight } from "react-icons/fa";
import { type NavigateFunction } from "react-router-dom";

interface TransactionRow {
  _id: string;
  createdAt: string | Date;
  source: string;
  type: "credit" | "debit";
  amount: number;
  bookingId?: string;
}

export const UserWalletColumns = (navigate: NavigateFunction) => [
    {
      header: "Date",
      accessor: "createdAt",
      render: (row: TransactionRow) => (
        <div className="flex flex-col">
          <span className="font-bold text-gray-700">{new Date(row.createdAt).toLocaleDateString()}</span>
          <span className="text-[10px] text-gray-400">{new Date(row.createdAt).toLocaleTimeString()}</span>
        </div>
      )
    },
    {
      header: "Type",
      accessor: "type",
      render: (row: any) => (
        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${row.type === "credit" ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"
          }`}>
          {row.type}
        </span>
      )
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (row: TransactionRow) => (
        <span className={`font-black text-sm ${row.type === "credit" ? "text-green-600" : "text-red-600"}`}>
          {row.type === "credit" ? "+" : "-"} ₹{row.amount}
        </span>
      )
    },
    {
      header: "View",
      accessor: "bookingId",
      render: (row: TransactionRow) => row.bookingId && (
        <button
          onClick={() => navigate(`/bookings/${row.bookingId}`)}
          className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-2 py-1 rounded-md"
        >
          VIEW BOOKING <FaArrowRight className="text-[8px]" />
        </button>
      )
    }
  ];
