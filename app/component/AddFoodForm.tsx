"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type AddFoodFormProps = {
  onClose: () => void;
  onSuccess?: () => void;
};

export default function AddFoodForm({ onClose, onSuccess }: AddFoodFormProps) {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const [food, setFood] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    isAvailable: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFood((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setGlobalError("");

    try {
      const formData = new FormData();
      formData.append("name", food.name);
      formData.append("description", food.description);
      formData.append("price", food.price);
      formData.append("category", food.category);
      formData.append("isAvailable", String(food.isAvailable));

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("/api/dashboard/addfood", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setGlobalError(data.message || "Unable to add food item.");
        return;
      }

      onSuccess?.();
      onClose();
     // router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setGlobalError(error.message);
      } else {
        setGlobalError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="mx-auto w-full max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-800">Add Food Item</h2>
      {globalError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {globalError}
        </p>
      ) : null}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Food Name</label>
        <input
          type="text"
          name="name"
          value={food.name}
          onChange={handleChange}
          placeholder="Chicken Burger"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-[#b5232a]"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={food.description}
          onChange={handleChange}
          rows={4}
          placeholder="Enter food description..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-[#b5232a]"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={food.price}
          onChange={handleChange}
          step="0.01"
          placeholder="799.99"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-[#b5232a]"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>

        <select
          name="category"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-[#b5232a]"
          value={food.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="BURGER">BURGER</option>
          <option value="PIZZA">PIZZA</option>
          <option value="DRINK">DRINK</option>
          <option value="DESSERT">DESSERT</option>
          <option value="PASTA">PASTA</option>
          <option value="FRIES">FRIES</option>
          <option value="OTHERS">OTHERS</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Food Image</label>

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 file:mr-4 file:rounded-lg file:border-0 file:bg-[#b5232a] file:px-4 file:py-2 file:text-white"
          onChange={handleImageChange}
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isAvailable"
          checked={food.isAvailable}
          onChange={handleChange}
          name="isAvailable"
          className="h-5 w-5 accent-[#b5232a]"
        />

        <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">
          Available
        </label>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-[#b5232a] px-6 py-2 font-medium text-white hover:bg-[#971d23]"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </div>
    </form>
  );
}