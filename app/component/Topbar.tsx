import { Menu, Search, Bell, ChevronDown } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-8 py-5">
      <div className="flex items-center gap-4">
        <Menu size={20} className="text-gray-500" />
        <h1 className="text-[19px] font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            readOnly
            placeholder="Search orders, customers, food..."
            className="w-72 rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-[13px] text-gray-500 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-500"
        >
          <Bell size={17} />
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b5232a] px-1 text-[10px] font-semibold text-white">
            8
          </span>
        </button>

        <div className="flex items-center gap-2 pl-1">
          <img
            src="https://i.pravatar.cc/64?img=12"
            alt="Admin avatar"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-gray-900">Admin</p>
            <p className="text-[11px] text-gray-400">Administrator</p>
          </div>
          <ChevronDown size={15} className="ml-1 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
