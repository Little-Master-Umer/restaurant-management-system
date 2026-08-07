"use client";
import { ArrowRight } from "lucide-react";
import { FoodCategory  } from "@prisma/client";
import { useEffect, useState } from "react";

export type newFood = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string | null;
  category: FoodCategory;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
};




function ArrivalCard({ id, name, price, description, category , image,isAvailable,created,updated }: {
  id: string;
  name: string;
  price: number;
  description: string;
  category: FoodCategory;
  image: string | null;
  isAvailable: boolean;
  created: Date;
  updated: Date;
}) {
  return (
    <div className="min-w-[280px] shrink-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-12 w-12 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f8d7d8] to-[#fef2f2] text-[11px] font-bold text-[#b5232a]">
              Food
            </div>
          )}
          <div>
            <span className="mb-1 inline-flex rounded-md bg-[#b5232a] px-2 py-0.5 text-[10.5px] font-semibold text-white">
              New
            </span>
            <p className="text-[13.5px] font-semibold text-gray-900">{name}</p>
            <p className="text-[12px] text-gray-400">{description}</p>
          </div>
        </div>
        <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[11.5px] font-semibold text-gray-600">
          {id}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-[11.5px]">
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-gray-400">Price</p>
          <p className="mt-1 text-[13px] font-bold text-gray-900">{price}</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-gray-400">Category</p>
          <p className="mt-1 truncate font-semibold text-gray-700">{category}</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-gray-400">Available</p>
          <p className="mt-1 font-semibold text-gray-700">
            {isAvailable ? "Yes" : "No"}
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-gray-400">Updated</p>
          <p className="mt-1 font-semibold text-gray-700">
            {updated instanceof Date ? updated.toLocaleDateString() : String(updated)}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[11.5px] text-gray-400">
        Added on {created instanceof Date ? created.toLocaleDateString() : String(created)}
      </p>
    </div>
  );
}

type RecentArrivalsProps = {
  refresh: number;
};

export default function RecentArrivals({ refresh }: RecentArrivalsProps) {
 

  const [foods, setFoods]=useState<newFood[]>([]);
  const [globalError,setGlobalError]=useState("");
  const [loading ,setLoading]=useState(false)

  async function getFood(){
    try{
      setLoading(true);
      const res=await fetch('/api/dashboard/food');
      const data=await res.json();
      if(data.success){
        setFoods(data.data);
        
      }
      if(!data.success){
        setGlobalError(data.message)
      }
    }catch(e){
      setGlobalError(e instanceof Error ? e.message : String(e));
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    getFood();
  }, [refresh])


  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <h2 className="mb-4 text-[16px] font-bold text-gray-900">
        Recent Arrivals (New Orders)
      </h2>

      <div className="flex items-center gap-4">
        <div className="flex flex-1 gap-4 overflow-x-auto pb-1">
          {foods.map((arrival) => (
            <ArrivalCard
            key={arrival.id}
            id={arrival.id}
            name={arrival.name}
            price={arrival.price}
            description={arrival.description}
            category={arrival.category}
            image={arrival.image}
            isAvailable={arrival.isAvailable}
            created={arrival.createdAt}
            updated={arrival.updatedAt}
            />
          ))}
        </div>
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
