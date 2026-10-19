import React, { useState } from "react";
import { Search, MoreHorizontal, ArrowUpDown } from "lucide-react";

export interface TableUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending" | "Offline";
  amount: string;
  date: string;
  avatar: string;
}

export const DataTableDemo: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof TableUser>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const initialData: TableUser[] = [
    {
      id: "1",
      name: "Sarah Connor",
      email: "sarah.c@sky.net",
      role: "DevOps Lead",
      status: "Active",
      amount: "$14,250",
      date: "Oct 14, 2026",
      avatar: "SC",
    },
    {
      id: "2",
      name: "Alex Rivera",
      email: "alex@designflow.io",
      role: "Staff UI Designer",
      status: "Active",
      amount: "$9,800",
      date: "Oct 12, 2026",
      avatar: "AR",
    },
    {
      id: "3",
      name: "Elena Rostova",
      email: "elena@vortexlabs.org",
      role: "Frontend Architect",
      status: "Pending",
      amount: "$18,400",
      date: "Oct 10, 2026",
      avatar: "ER",
    },
    {
      id: "4",
      name: "Marcus Chen",
      email: "marcus@hypergrowth.co",
      role: "Product Manager",
      status: "Active",
      amount: "$12,100",
      date: "Oct 08, 2026",
      avatar: "MC",
    },
    {
      id: "5",
      name: "Liam Vance",
      email: "liam@securitycore.dev",
      role: "Security Engineer",
      status: "Offline",
      amount: "$6,950",
      date: "Oct 05, 2026",
      avatar: "LV",
    },
  ];

  const handleSort = (field: keyof TableUser) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredData = initialData
    .filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 p-5 sm:p-6 rounded-2xl bg-[#121215] border border-zinc-800 shadow-sm">
      {/* Top Controls: Search & Total */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Team Members & Invoicing
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Searchable, sortable data table with status pills.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role..."
            className="w-full bg-[#18181b] border border-zinc-800 rounded-xl pl-9 pr-3.5 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-zinc-800 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-[#18181b] border-b border-zinc-800 text-zinc-400 font-semibold">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>User</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                </div>
              </th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th
                onClick={() => handleSort("amount")}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Invoiced</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                </div>
              </th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {filteredData.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-zinc-800/25 transition-colors"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs text-zinc-200 shrink-0">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {user.name}
                      </div>
                      <div className="text-xs text-zinc-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-zinc-300">{user.role}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      user.status === "Active"
                        ? "bg-emerald-950/50 text-emerald-400 border-emerald-900/60"
                        : user.status === "Pending"
                          ? "bg-amber-950/50 text-amber-400 border-amber-900/60"
                          : "bg-zinc-800 text-zinc-400 border-zinc-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-zinc-100 font-medium">
                  {user.amount}
                </td>
                <td className="py-3.5 px-4 text-zinc-400 text-xs">
                  {user.date}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-zinc-400 pt-2">
        <span>
          Showing {filteredData.length} of {initialData.length} members
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg bg-[#18181b] border border-zinc-800 text-zinc-200 hover:text-white disabled:opacity-40 cursor-pointer font-medium"
          >
            Previous
          </button>
          <span className="font-mono text-zinc-300 px-1">Page {page}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={true}
            className="px-3 py-1.5 rounded-lg bg-[#18181b] border border-zinc-800 text-zinc-200 hover:text-white disabled:opacity-40 cursor-pointer font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTableDemo;
