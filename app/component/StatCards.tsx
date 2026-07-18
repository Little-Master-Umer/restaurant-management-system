"use client"
import { ShoppingBag, Clock, CheckCircle2, DollarSign, X, ArrowUp } from "lucide-react";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { NextResponse,NextRequest } from "next/server";
const STATS = [
  { key:"total",
    label: "Total Orders",
    // delta: "12%",
    icon: ShoppingBag,
    iconBg: "bg-[#fde3e3]",
    iconColor: "text-[#e15b5b]",
  },
  { key:"pending",
    label: "Pending Orders",
    // delta: "8%",
    icon: Clock,
    iconBg: "bg-[#fbe8cf]",
    iconColor: "text-[#e0a53f]",
  },
  { key:"delivered",
    label: "Delivered Orders",
    // delta: "15%",
    icon: CheckCircle2,
    iconBg: "bg-[#d9f2df]",
    iconColor: "text-[#3fb56b]",
  },
  { key:"revenue",
    label: "Total Revenue",
    // delta: "18%",
    icon: DollarSign,
    iconBg: "bg-[#e5e0fb]",
    iconColor: "text-[#7c5cf0]",
  },
  {
    key:"cancelled",
    label: "Total Cancelled Orders",
    // value: "1,256",
    // delta: "10%",
    icon: X,
    iconBg: "bg-[#fde3e3]",
    iconColor: "text-red-600",
  },
];
type StatsKey = keyof typeof STATS;

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<any>;
  iconBg: string;
  iconColor: string;
}

function StatCard({ label, value, icon: Icon, iconBg, iconColor }: StatCardProps) {
  



  return (
    <div className="flex flex-1 min-w-[190px] flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
        <Icon size={20} className={iconColor} strokeWidth={2.2} />
      </div>
      <div>
        <p className="text-[13px] text-gray-500">{label}</p>
        <p className="text-[22px] font-bold text-gray-900">{value}</p>
      </div>
      <div className="flex items-center gap-1 text-[12px] font-medium text-emerald-500">
        <ArrowUp size={13} />
        {/* <span>{delta} from yesterday</span> */}
      </div>
    </div>
  );
}

type dashsta ={
  total:number,
  pending:number,
  delivered:number,
  revenue:number,
  cancelled:number,

}

type StatProps={
  stats:dashsta
}

export default function StatCards({stats}: StatProps) {
  // const [globalError, setglobalError]=useState("");
  // const [val,setValue]=useState("");
  // const [sta,setSta]=useState({
  //   total:110,
  //   pending:0,
  //   delivered:0,
  //   revenue:0,
  //   cancelled:0,
  // })


 // async function getStat(){
  //   try {

  //     const result=await fetch("api/stat");
  //     const da=await result.json();
  //     if(!da.success){
  //       setSta(da.data);
  //       setglobalError(da.message);
  //       return;

  //     }
  //     if(da.success){
  //       setSta(da.data);
  //     }

  //   } catch (error) {
  //     setglobalError("Failed Stats Retrivel");
  //   }
  // }

  // useEffect(()=>{
  //     getStat();
  //     const interval=setInterval(getStat,5000);
  //     return()=>clearInterval(interval);
  //   },[]);


  return (
    <div className="flex flex-wrap gap-5">
      {STATS.map((stat) => (
        <StatCard key={stat.key}
                  label={stat.label}
                  value={stats[stat.key]}
                  icon={stat.icon}
                  iconBg={stat.iconBg}
                  iconColor={stat.iconColor}
         />
      ))}
    </div>
  );
}
