import {
  LayoutDashboard,
  ClipboardList,
  History,
  UtensilsCrossed,
  LayoutGrid,
  Users,
  Bike,
  BarChart3,
  Tag,
  Star,
  Settings,
  ChefHat,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Orders", icon: ClipboardList },
  { label: "Order History", icon: History },
  { label: "Food Management", icon: UtensilsCrossed },
  { label: "Categories", icon: LayoutGrid },
  { label: "Customers", icon: Users },
  { label: "Delivery Riders", icon: Bike },
  { label: "Reports", icon: BarChart3 },
  { label: "Coupons & Offers", icon: Tag },
  { label: "Reviews", icon: Star },
  { label: "Settings", icon: Settings },
];

function NavItem({ icon: Icon, label, active }) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[13.5px] font-medium transition-colors ${
        active
          ? "bg-white text-[#b5232a] shadow-sm"
          : "text-white/85 hover:bg-white/10"
      }`}
    >
      <Icon size={18} strokeWidth={2} />
      <span>{label}</span>
    </button>
  );
}

export default function Sidebar() {
  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col bg-[#b5232a] px-4 py-6">
      {/* Brand */}
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <ChefHat size={22} className="text-white" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[15px] font-bold leading-tight text-white">
            FoodieRestro
          </p>
          <p className="text-[11px] text-white/70">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      {/* Today's summary */}
      <div className="mt-6 rounded-2xl bg-white/10 p-4">
        <p className="text-[13px] font-semibold text-white">Today's Summary</p>
        <p className="mb-3 text-[11px] text-white/60">15 May 2024</p>

        <div className="space-y-2 text-[12.5px]">
          <div className="flex items-center justify-between">
            <span className="text-white/75">Total Orders</span>
            <span className="font-semibold text-white">125</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/75">Total Revenue</span>
            <span className="font-semibold text-white">$2,450.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/75">New Customers</span>
            <span className="font-semibold text-white">18</span>
          </div>
        </div>

        <button
          type="button"
          className="mt-4 w-full rounded-lg bg-white/15 py-2 text-[12.5px] font-medium text-white transition-colors hover:bg-white/25"
        >
          View Full Report
        </button>
      </div>
    </aside>
  );
}
