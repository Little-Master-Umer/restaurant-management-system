"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";



type dashsta={
  total:number,
  pending:number,
  delivered:number,
  revenue:number,
  cancelled:number,
}
type Statsprops={
  stats:dashsta,
}

export default function OrderStatusDonut({stats}:Statsprops) {
  const DATA = [
    { key:"pending" ,label: "Pending", value: stats.pending, color: "#e15b5b" },
    { key:"delivered",label: "Delivered", value: stats.delivered, color: "#3fb56b" },
    { key:"cancelled",label: "Cancelled", value: stats.cancelled, color: "#c9ccd1" },
  ];
  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-gray-900">Order Status</h2>
        <button
          type="button"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-[12.5px] font-medium text-gray-600"
        >
          View All Orders
        </button>
      </div>

      <div className="relative mx-auto h-[190px] w-[190px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={DATA}
              dataKey="value"
              nameKey="label"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={2}
              stroke="none"
            >
              {DATA.map((entry) => (
                <Cell key={entry.key} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[24px] font-bold text-gray-900">{stats.total}</p>
          <p className="text-[11.5px] text-gray-400">Total Orders</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {DATA.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-2 text-gray-600">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </div>
            <span className="font-semibold text-gray-900">
              {item.value} <span className="font-normal text-gray-400"></span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
