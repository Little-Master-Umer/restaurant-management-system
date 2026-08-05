
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

type StatusKey = keyof typeof STATUS_STYLES;

type Order = {
  id: string;
  customer: string;
  items: string;
  amount: string;
  status: StatusKey;
  time: string;
};

const STATUS_STYLES = {
  PENDING: "bg-[#fbe8cf] text-[#c98a24]",
  PREPARATION: "bg-[#dbeafe] text-[#3f7fe0]",
  DELIVERED: "bg-[#d9f2df] text-[#2fa563]",
  CANCELLED: "bg-red-100 text-red-500"
};
const statuses = Object.keys(STATUS_STYLES) as (keyof typeof STATUS_STYLES)[];

function StatusBadge({ status }: { status: keyof typeof STATUS_STYLES }) {
  const displayStatus = status === "PENDING" ? "Pending" : 
                       status === "PREPARATION" ? "Preparing" :
                       status === "DELIVERED" ? "Delivered" : "Cancelled";
  
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${STATUS_STYLES[status]}`}
    >
      {displayStatus}
    </span>
  );
}

export default function RecentOrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [openOrder, setOpenOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboard/recent-orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch orders', err);
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(id: string, status: keyof typeof STATUS_STYLES) {
    try {
      const res = await fetch('/api/dashboard/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (!res.ok) {
        console.error('Update failed:', json.message || 'Unknown error');
        throw new Error(json.message || 'Update failed');
      }
      if (json.success) {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setOpenOrder(null);
    }
  }
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

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
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
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-50 text-[13px]">
                <td className="py-3.5 font-semibold text-gray-800">{order.id}</td>
                <td className="py-3.5 text-gray-600">{order.customer}</td>
                <td className="py-3.5 text-gray-500">{order.items}</td>
                <td className="py-3.5 font-medium text-gray-800">{order.amount}</td>
                <td className="py-3.5">
                  <StatusBadge status={order.status} />
                </td>
                <td className="py-3.5 text-gray-400">{order.time}</td>
                <td className="py-3.5 relative">
                  <button
                    onClick={() => setOpenOrder(order.id)}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-[12px] font-medium text-black"
                  >
                    Update
                    <ChevronDown size={13} />
                  </button>
                  {openOrder === order.id && (
                    <div className="absolute z-10 mt-2 w-40 rounded-lg border bg-white shadow-lg">
                      {statuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(order.id, status)}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-black"
                        >
                          {status === "PENDING" ? "Pending" : 
                           status === "PREPARATION" ? "Preparing" :
                           status === "DELIVERED" ? "Delivered" : "Cancelled"}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}