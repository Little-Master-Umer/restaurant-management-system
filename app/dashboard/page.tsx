"use client";
import Sidebar from "../component/Sidebar";
import Topbar from "../component/Topbar";
import StatCards from "../component/StatCards";
import OrdersOverviewChart from "../component/OrdersOverviewChart";
import OrderStatusDonut from "../component/OrderStatusDonut";
import RecentOrdersTable from "../component/RecentOrdersTable";
import RecentArrivals from "../component/RecentArrivals";
import AddNewFoodCard from "../component/AddNewFoodCard";
import TopSellingItems from "../component/TopSellingItems";
import { useState } from "react";
import { useEffect } from "react";
export default function Dashboard() {
  const [globalError, setglobalError]=useState("");
    const [val,setValue]=useState("");
    const [dashsta,setDashsta]=useState({
      total:0,
      pending:0,
      delivered:0,
      revenue:0,
      cancelled:0,
    })
  
  
    async function getStat(){
      try {
  
        const result=await fetch("api/dashboard/stat");
        const da=await result.json();
        if(!da.success){
          setDashsta(da.data);
          setglobalError(da.message);
          return;
  
        }
        if(da.success){
          setDashsta(da.data);
        }
      } catch (error) {
        setglobalError("Failed Stats Retrivel");
      }
    }
  
    useEffect(()=>{
        getStat();
        const interval=setInterval(getStat,5000);
        return()=>clearInterval(interval);
      },[]);


  


  return (
    <div className="flex h-screen w-full bg-gray-100 font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <Topbar /> 

        <main className="flex flex-col gap-6 p-8">
          <StatCards stats={dashsta} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
            <OrdersOverviewChart />
            <OrderStatusDonut stats={dashsta} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
            <RecentOrdersTable />
            <div className="flex flex-col gap-6">
              <AddNewFoodCard />
              <TopSellingItems />
            </div>
          </div>

          <RecentArrivals />
        </main>
      </div>
    </div>
  );
}
