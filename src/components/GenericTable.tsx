import React from "react";
import Loading from "./Loading";
type Column<T> = {
  header: string;
  accessor: keyof T | string; 
  render?: (row: T) => React.ReactNode; 
  className?: string;
};

type GenericTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  page: number;
  loading: boolean;
  emptyMessage?: string;
};

function GenericTable<T extends { _id: string }>({
  data,
  columns,
  page,
  loading,
  emptyMessage = "No records found.",
}: GenericTableProps<T>) {
  return (
    <table className="w-full table-fixed text-sm text-left text-gray-600">
      <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider border-b">
        <tr>
          <th className="py-3 px-4">ID</th>
          {columns.map((col, idx) => (
            <th key={idx} className={`py-3 px-4 ${col.className || ""}`}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={columns.length + 1} className="text-center py-8">
              <Loading message="Loading..."/>
            </td>
          </tr>
        ) : data.length > 0 ? (
          data.map((row, index) => (
            <tr key={row._id} className="hover:bg-gray-50 transition">
              <td className="py-3 px-4">{(page - 1) * 5 + index + 1}</td>
              {columns.map((col, idx) => (
                <td key={idx} className={`py-3 px-4 ${col.className || ""}`}>
                  {col.render ? col.render(row) : (row[col.accessor as keyof T] as React.ReactNode) ?? "NA"}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1} className="py-3 px-4 text-center text-gray-500">
              {emptyMessage}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default GenericTable;
