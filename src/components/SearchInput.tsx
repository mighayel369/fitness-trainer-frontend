import React from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

const SearchInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "Search...",
  fullWidth = true,
}) => {
  return (
    <div className={`relative ${fullWidth ? "w-full" : "max-w-xs"}`}>
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          pl-11
          pr-4
          py-3
          bg-gray-50
          border-none
          rounded-xl
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-red-500
          transition-all
        "
      />
    </div>
  );
};

export default SearchInput;