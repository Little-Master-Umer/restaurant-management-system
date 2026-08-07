"use client";
import Sidebar from "../component/Sidebar";
import Topbar from "../component/Topbar";
import StatCards from "../component/StatCards";
import OrdersOverviewChart from "../component/OrdersOverviewChart";
import OrderStatusDonut from "../component/OrderStatusDonut";
import RecentOrdersTable from "../component/RecentOrdersTable";
import RecentArrivals from "../component/RecentAddedFood";
import AddNewFoodCard from "../component/AddNewFoodCard";
import TopSellingItems from "../component/TopSellingItems";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const router = useRouter();
  const [globalError, setglobalError]=useState("");
  const [foodRefresh, setFoodRefresh] = useState(6);
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
        const result=await fetch("/api/dashboard/stat");
        if(result.status===401){
          router.push("/login");
          return;
        }
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

    // schedule client-side redirect based on token expiry reported by server
    useEffect(()=>{
      let timer: ReturnType<typeof setTimeout> | null = null;
      async function checkExpiry(){
        try{
          const r = await fetch('/api/auth/check');
          if(r.status===401){
            router.push('/login');
            return;
          }
          const j = await r.json();
          if(j?.exp){
            const msUntil = j.exp * 1000 - Date.now();
            if(msUntil <= 0){
              router.push('/login');
              return;
            }
            timer = setTimeout(()=>{
              router.push('/login');
            }, msUntil + 500);
          }
        }catch(e){
          // ignore
        }
      }
      checkExpiry();
      return ()=>{ if(timer) clearTimeout(timer); }
    },[router]);

    const handleFoodAdded = () => {
     setFoodRefresh((prev) => prev + 1);
    };
    

  


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
              <AddNewFoodCard onFoodAdded={handleFoodAdded} refresh={foodRefresh} />
              <TopSellingItems />
            </div>
          </div>

          <RecentArrivals  refresh={foodRefresh}/>
        </main>
      </div>
    </div>
  );
}
