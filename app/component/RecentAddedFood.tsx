import { ArrowRight } from "lucide-react";
import { FoodCategory  } from "@prisma/client";

const ARRIVALS = [
  {
    id: "#ORD-1052",
    customer: "Hassan Raza",
    items: "1x Zinger Burger, 1x Fries",
    amount: "$12.50",
    time: "Just now",
  },
  {
    id: "#ORD-1053",
    customer: "Ayesha Malik",
    items: "1x Pasta, 1x Coke",
    amount: "$13.00",
    time: "Just now",
  },
  {
    id: "#ORD-1054",
    customer: "Ali Hamza",
    items: "2x Shawarma, 1x Drink",
    amount: "$15.50",
    time: "Just now",
  },
  {
    id: "#ORD-1055",
    customer: "Zainab Fatima",
    items: "1x Pizza, 1x Garlic Bread",
    amount: "$17.00",
    time: "Just now",
  },
];
export type newFood={
  id:string,
  food:string,
  price:number,
  description:string,
  category:FoodCategory ,
  image:string,
}




function ArrivalCard({ id, customer, items, amount, time }) {
  return (
    <div className="min-w-[220px] flex-1 rounded-2xl border border-gray-100 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-md bg-[#b5232a] px-2 py-0.5 text-[10.5px] font-semibold text-white">
          New
        </span>
        <span className="text-[12px] font-semibold text-gray-700">{id}</span>
      </div>
      <p className="text-[13.5px] font-semibold text-gray-900">{customer}</p>
      <p className="mb-4 text-[12px] text-gray-400">{items}</p>
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-bold text-gray-900">{amount}</span>
        <span className="text-[11.5px] text-gray-400">{time}</span>
      </div>
    </div>
  );
}

export default function RecentArrivals() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <h2 className="mb-4 text-[16px] font-bold text-gray-900">
        Recent Arrivals (New Orders)
      </h2>

      <div className="flex items-center gap-4">
        <div className="flex flex-1 gap-4 overflow-x-auto">
          {ARRIVALS.map((arrival) => (
            <ArrivalCard key={arrival.id} {...arrival} />
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
