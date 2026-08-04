"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

const DATA = [
  { day: "9 May", total: 62, pending: 25, delivered: 40, cancelled: 5 },
  { day: "10 May", total: 78, pending: 30, delivered: 45, cancelled: 6 },
  { day: "11 May", total: 105, pending: 42, delivered: 60, cancelled: 4 },
  { day: "12 May", total: 82, pending: 32, delivered: 50, cancelled: 5 },
  { day: "13 May", total: 90, pending: 35, delivered: 55, cancelled: 6 },
  { day: "14 May", total: 68, pending: 28, delivered: 48, cancelled: 5 },
  { day: "15 May", total: 96, pending: 33, delivered: 58, cancelled: 6 },
];

const LEGEND = [
  { label: "Total Orders", color: "#e15b5b" },
  { label: "Pending", color: "#e0a53f" },
  { label: "Delivered", color: "#3fb56b" },
  { label: "Cancelled", color: "#a3a9b3" },
];

export type OrderOverview={
  day:string,
  totalorders:number,
  pending:number,
  delivered:number,
  cancelled:number,
}



export default function OrdersOverviewChart() {
  const [stats, setStats]=useState<OrderOverview[]>([]);
  const [globalError,setGlobalError]=useState("");
    async function getOver(){
        try {
          const body= await fetch("/api/dashboard/order-overview");
          const res = await body.json();
        
          console.log("Grouped:", res);
          if (!res.success){
            setGlobalError(res.message??"Something Went Wrong!");
            return;
          }
          if (res.success){
            setStats(res.data);
          }
          console.log(res.data);
        } catch (error) {
          setGlobalError("error happenend");
        }
        
      }
    
    

    useEffect(()=>{
        getOver();

        const interval=setInterval(getOver,5000);
        return()=>clearInterval(interval);

    },[]);

    
  


  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-gray-900">Orders Overview</h2>
        {/* <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-[12.5px] font-medium text-gray-600"
        >
          This Week
          <ChevronDown size={14} />
        </button> */}
      </div>

      <div className="mb-4 flex flex-wrap gap-5">
        {LEGEND.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-[12.5px] text-gray-500">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </div>
        ))}
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stats} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#f1f1f1" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
            />
            <YAxis
              // domain={[0, 120]}
              // ticks={[0, 30, 60, 90, 120]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #f0f0f0",
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="totalorders"
              stroke="#e15b5b"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#e15b5b", strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="pending"
              stroke="#e0a53f"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#e0a53f", strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="delivered"
              stroke="#3fb56b"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#3fb56b", strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="cancelled"
              stroke="#a3a9b3"
              strokeWidth={2}
              dot={{ r: 3, fill: "#a3a9b3", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
