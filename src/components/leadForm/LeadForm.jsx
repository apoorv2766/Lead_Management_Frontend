import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  CubeIcon,
  BellIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { LuArrowUpDown } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import AddLead from "../showLeads/AddLeads";
import Filter from "../filter/Filter";
import { useLeadContext } from "../../../context";
import axiosInstance from "../../../api/axios";

export default function LeadCRM({}) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  // const [searchTerm, setSearchTerm] = useState("");
  const [showAddLead, setShowAddLead] = useState(false);
  const [filterDisplay, setFilterDisplay] = useState(false);

  const { leadAdded, setSearchTerm, searchTerm } = useLeadContext();

  console.log("searchTermsearchTerm", searchTerm);

  const fetchLeads = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/lead/showLeads`, {
        params: { page: pageNum, limit: 10 },
      });
      setLeads(res.data.leads);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(page);
    console.log(leadAdded);
  }, [page]);

  useEffect(() => {
    if (leadAdded) {
      fetchLeads(page);
      console.log("Lead added, fetching leads...", leadAdded);
    }
  }, [leadAdded]);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    setLeads(
      [...leads].sort((a, b) => {
        if (a[field] < b[field]) return order === "asc" ? -1 : 1;
        if (a[field] > b[field]) return order === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  const filteredLeads = leads?.filter((lead) => {
    const nameMatch = lead.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const phoneMatch = lead.phone
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const assignedMatch = lead.assignedTo
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch || phoneMatch || assignedMatch;
  });

  const menuItems = [
    { name: "Dashboard", icon: HomeIcon },
    { name: "Leads", icon: UsersIcon },
    { name: "Follow-Ups", icon: ClipboardDocumentCheckIcon },
    { name: "Sales Activity", icon: ChartBarIcon },
    { name: "Products", icon: CubeIcon },
    { name: "Notifications", icon: BellIcon },
    { name: "Settings", icon: Cog6ToothIcon },
  ];

  const columns = [
    { label: "Name", field: "name", sortable: true },
    { label: "Contact", field: "phone", sortable: true },
    { label: "Status", field: "status", sortable: true },
    { label: "Qualification", field: "qualification", sortable: true },
    { label: "Interest", field: "interestField", sortable: true },
    { label: "Source", field: "source", sortable: true },
    { label: "Assigned To", field: "assignedTo", sortable: false },
    { label: "Updated At", field: "updatedAt", sortable: true },
  ];

  if (loading) return <div className="p-6">Loading leads...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border border-gray-200">
        <div className="p-4 font-bold text-xl">LeadCRM</div>
        <hr className="border-gray-300" />
        <nav className="p-4">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                item.name === "Leads" ? "bg-gray-100 font-medium" : ""
              }`}
            >
              <item.icon className="h-5 w-5 text-gray-600" />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Leads</h1>
            <p className="text-gray-500">Manage and track your leads</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              onClick={() => setShowAddLead(true)}
            >
              + Add Lead
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-4 py-2 bg-white"
          />
          {/* Filter Button */}
          <button
            className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2  ml-3 cursor-pointer"
            onClick={() => setFilterDisplay(true)}
          >
            <FiFilter size={20} />
            <span>Filters</span>
          </button>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-lg text-gray-500 uppercase bg-gray-100">
              <tr>
                {columns.map((col) => (
                  <th key={col.field} scope="col" className="px-6 py-3">
                    {col.sortable ? (
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => handleSort(col.field)}
                      >
                        {col.field === "updatedAt" ? (
                          <span className="flex flex-col leading-tight">
                            <span>Updated</span>
                            <span>At</span>
                          </span>
                        ) : col.field === "assignedTo" ? (
                          <span className="flex flex-col leading-tight">
                            <span>Assigned</span>
                            <span>To</span>
                          </span>
                        ) : (
                          col.label
                        )}
                        <LuArrowUpDown />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        {col.field === "assignedTo" ? (
                          <span className="flex flex-col leading-tight">
                            <span>Assigned</span>
                            <span>To</span>
                          </span>
                        ) : (
                          col.label
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredLeads?.length > 0 ? (
                filteredLeads?.map((lead) => (
                  <tr
                    key={lead._id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-7 font-medium text-blue-600 whitespace-nowrap">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 font-bold">{lead.phone}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          lead.status === "New"
                            ? "text-blue-700 bg-blue-100"
                            : lead.status === "Qualified"
                            ? "text-green-700 bg-green-100"
                            : lead.status === "Converted"
                            ? "text-purple-700 bg-purple-100"
                            : lead.status === "Follow-Up"
                            ? "text-red-700 bg-red-100"
                            : "text-gray-700 bg-gray-100"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {lead.qualification || "-"}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {lead.interestField || "-"}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {lead.source || "-"}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {lead.assignedTo || "-"}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      <div>
                        {new Date(lead.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div>
                        {new Date(lead.updatedAt).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => fetchLeads(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => fetchLeads(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </main>
      {showAddLead && <AddLead onClose={() => setShowAddLead(false)} />}
      {filterDisplay && (
        <div className="fixed inset-0 z-50  backdrop-blur-xs">
          <Filter
            onClose={() => setFilterDisplay(false)}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </div>
  );
}
