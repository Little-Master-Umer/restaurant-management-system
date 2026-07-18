import { Plus, ChefHat } from "lucide-react";

export default function AddNewFoodCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-gray-900">Add New Food</h2>
        <button
          type="button"
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
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl bg-[#b5232a] px-5 py-2.5 text-[13px] font-semibold text-white"
        >
          <Plus size={15} />
          Add Food Item
        </button>
      </div>
    </div>
  );
}
