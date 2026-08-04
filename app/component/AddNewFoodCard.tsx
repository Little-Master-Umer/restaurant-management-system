"use client";
import { Plus, ChefHat } from "lucide-react";
import { useEffect, useState } from "react";
import AddFoodForm from "./AddFoodForm";

export default function AddNewFoodCard() {
  const [showForm, setShowForm] = useState(false);
  const [availableCount, setAvailableCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCount = async () => {
      try {
        const res = await fetch("/api/dashboard/food-count");
        const data = await res.json();

        if (isMounted) {
          setAvailableCount(data?.count ?? 0);
        }
      } catch {
        if (isMounted) {
          setAvailableCount(0);
        }
      }
    };

    loadCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-gray-900">Add New Food</h2>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-400"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-[#f3c6c6] bg-[#fdf3f3] px-6 py-8 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f7dede]">
          <ChefHat size={22} className="text-[#b5232a]" />
        </div>
        <p className="text-[14.5px] font-bold text-gray-900">Add New Food Item</p>
        <p className="mb-4 text-[12.5px] text-gray-400">
          Upload image, add details and price
        </p>
        <p className="mb-4 text-[13px] font-semibold text-[#b5232a]">
          Available items: {availableCount ?? "..."}
        </p>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl bg-[#b5232a] px-5 py-2.5 text-[13px] font-semibold text-white"
          onClick={()=>setShowForm(true)}
        >
          <Plus size={15} />
          Add Food Item
        </button>

      </div>
      {showForm && (
        <AddFoodForm
          onClose={() => setShowForm(false)}
          onSuccess={() => setAvailableCount((prev) => (prev === null ? 1 : prev + 1))}
        />
      )}
    </div>
  );
}
