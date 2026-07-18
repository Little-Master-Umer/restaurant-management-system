
import { ChevronDown } from "lucide-react";

const ORDERS = [
  {
    id: "#ORD-1051",
    customer: "Ahmad Khan",
    items: "2x Burger, 1x Fries",
    amount: "$18.50",
    status: "Pending",
    time: "2 mins ago",
    action: "update",
  },
  {
    id: "#ORD-1050",
    customer: "Sara Ali",
    items: "1x Pizza, 2x Coke",
    amount: "$22.00",
    status: "Preparing",
    time: "5 mins ago",
    action: "update",
  },
  {
    id: "#ORD-1049",
    customer: "Usman Tariq",
    items: "1x Biryani, 1x Raita",
    amount: "$16.00",
    status: "On The Way",
    time: "10 mins ago",
    action: "update",
  },
  {
    id: "#ORD-1048",
    customer: "Fatima Noor",
    items: "3x Burger, 2x Fries",
    amount: "$27.75",
    status: "Delivered",
    time: "20 mins ago",
    action: "view",
  },
  {
    id: "#ORD-1047",
    customer: "Bilal Ahmed",
    items: "1x Pasta, 1x Garlic Bread",
    amount: "$14.30",
    status: "Delivered",
    time: "30 mins ago",
    action: "view",
  },
];

const STATUS_STYLES = {
  Pending: "bg-[#fbe8cf] text-[#c98a24]",
  Preparing: "bg-[#dbeafe] text-[#3f7fe0]",
  "On The Way": "bg-[#fde3c6] text-[#d97b2c]",
  Delivered: "bg-[#d9f2df] text-[#2fa563]",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

export default function RecentOrdersTable() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-gray-900">Recent Orders</h2>
        <button
          type="button"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-[12.5px] font-medium text-gray-600"
        >
          View All
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-[12px] text-gray-400">
            <th className="pb-3 font-medium">Order ID</th>
            <th className="pb-3 font-medium">Customer</th>
            <th className="pb-3 font-medium">Items</th>
            <th className="pb-3 font-medium">Amount</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Time</th>
            <th className="pb-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {ORDERS.map((order) => (
            <tr key={order.id} className="border-t border-gray-50 text-[13px]">
              <td className="py-3.5 font-semibold text-gray-800">{order.id}</td>
              <td className="py-3.5 text-gray-600">{order.customer}</td>
              <td className="py-3.5 text-gray-500">{order.items}</td>
              <td className="py-3.5 font-medium text-gray-800">{order.amount}</td>
              <td className="py-3.5">
                <StatusBadge status={order.status} />
              </td>
              <td className="py-3.5 text-gray-400">{order.time}</td>
              <td className="py-3.5">
                {order.action === "update" ? (
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-[12px] font-medium text-gray-600"
                  >
                    Update
                    <ChevronDown size={13} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="rounded-lg border border-gray-200 px-3.5 py-1.5 text-[12px] font-medium text-gray-600"
                  >
                    View
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
