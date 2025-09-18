import React, { use, useEffect, useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { useLeadContext } from "../../../context";

export default function LeadFilters({ onApply, onClear, onClose, leads }) {
  const [matchType, setMatchType] = useState("AND");
  const [filters, setFilters] = useState([{ field: "status", value: "" }]);
  const [selectedOptions, setSelectedOptions] = useState("");
  const [seletedSubOptions, setSelectedSubOptions] = useState(["New", "Qualified", "Converted", "Follow-Up"]);
  const [selectedsubFilter, setSelectedSubFilter] = useState([]);

  const { setSearchTerm, searchTerm } = useLeadContext();

  const StatusArray = ["New", "Qualified", "Converted", "Follow-Up"];
  const SourceArray = ["Website", "Referral", "Social Media", "LinkedIn"];

  const FilterObject = {
    Status: StatusArray,
    Source: SourceArray,
  };

  useEffect(() => {
    console.log("Selected Options changed:", selectedOptions);
    setSelectedSubOptions(FilterObject[selectedOptions] || []);
    console.log("selectedSubOptions:", seletedSubOptions);
  }, [selectedOptions]);

  const handleFilterChange = (index, key, value) => {
    const newObect = { selectedOptions: selectedsubFilter };
    const newFilters = [...filters];
    newFilters[index][key] = value;
    setFilters(newFilters);
    console.log("Filters updated:", newFilters);
  };

  const addFilter = () => {
    setFilters([...filters, { field: "status", value: "" }]);
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-lg shadow-sm border border-white bg-gray-100 p-5">
      <div className="flex items-center justify-between mb-6">
        {/* Left side title */}
        <h1 className="text-4xl font-bold">Leads Management</h1>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          {/* Hide Filters Button */}
          <button
            // onClick={onToggleFilters}
            className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded-xl px-4 py-3 text-sm font-medium hover:bg-gray-100 bg-white"
            onClick={onClose}
          >
            <FiFilter className="text-gray-600 " />
            Hide Filters
          </button>

          {/* Add New Lead Button */}
          <button className="px-4 py-3 cursor-pointer bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800">
            Add New Lead
          </button>
        </div>
      </div>
      <div className="border rounded-xl py-8 px-8  border-white bg-white">
        {/* Search */}

        <div className="relative w-full mb-4">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <FiSearch size={18} />
          </span>
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            className="w-full border border-gray-300 bg-gray-100 rounded-xl pl-10 pr-4 py-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Advanced Filters */}
        <div className="bg-gray-100  rounded-xl p-4 border border-gray-300">
          <h3 className="font-semibold text-lg mb-3">Advanced Filters</h3>

          {/* Match Conditions */}
          <div className="flex items-center gap-6 mb-4 ">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                className="accent-black"
                checked={matchType === "AND"}
                onChange={() => setMatchType("AND")}
              />
              ALL conditions (AND)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                className="accent-black"
                checked={matchType === "OR"}
                onChange={() => setMatchType("OR")}
              />
              ANY condition (OR)
            </label>
          </div>

          {/* Filters List */}
          {filters.map((filter, index) => (
            <div key={index} className="flex items-center gap-2 mb-3">
              {/* Field Dropdown */}
              <select
                value={selectedOptions}
                onChange={(e) => {
                  // handleFilterChange(index, "field", e.target.value);
                  setSelectedOptions(e.target.value); // ✅ move logic here
                }}
                className="border border-gray-300 bg-white rounded-xl px-3 py-3"
              >
                {Object.keys(FilterObject).map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>

              {/*  select */}
              <select
                value={selectedsubFilter}
                onChange={(e) => {
                  handleFilterChange();
                  setSelectedSubFilter(e.target.value);
                }}
                className="flex-grow border rounded-xl px-3 py-3 border-gray-300 bg-white "
              >
                {seletedSubOptions?.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>

              {/* Remove Filter */}
              <button
                onClick={() => removeFilter(index)}
                className="text-gray-500 hover:text-red-600 cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add Filter Button */}
          <button
            onClick={addFilter}
            className="mt-2 border rounded-xl px-4 py-3 text-gray-600 border-gray-300 cursor-pointer bg-white    "
          >
            Add Filter
          </button>
          <hr className="border-gray-300 mt-6 " />

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button className="px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer bg-white ">
              Clear
            </button>
            <button
              onClick={() => onApply({ matchType, filters })}
              className="px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
