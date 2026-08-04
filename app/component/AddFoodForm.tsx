"use client";
import { ReactElement, useState } from "react";

export default function AddFoodForm() {


    // const [name,setname]=useState("");
    // const [description,setdescription]=useState("");
    // const [price,setprice]=useState("");
    // const [category,setcategory]=useState("");
    const [image,setimage]=useState<File|null>(null);
    //const [available,setavailable]=useState(true);
    const [loading, setLoading]=useState(false);
    
    const [error,seterror]=useState({
      name:"",
      description:"",
      price:"",
      category:"",
      isAvailable:true,
    });
    const [globalerror,setGlobalerror]=useState("");

    const [food,setFood]=useState({
      name:"",
      description:"",
      price:"",
      category:"",
      isAvailable:true,
    });

    const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{
      e.preventDefault;
      const{name,value,type}=e.target;
      

      setFood((prev)=>({
        ...prev,
        [name]:
               type==="checkbox"
               
               ?(e.target as HTMLInputElement ).checked: value,
      }));
      
    };
    //const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setimage(e.target.files?.[0] ?? null);
    };

    const handleSubmit=async(
      e:React.FormEvent<HTMLFormElement>
    )=>{
      try{
        
        e.preventDefault;
        setGlobalerror("");
        const formdata=new FormData();

        formdata.append("name",food.name);
        formdata.append("description",food.description);
        formdata.append("price",food.price);
        formdata.append("category",food.category);
        if(image){
         formdata.append("image",image);
        }

        const res=await fetch("api/dashboard/addfood",{
          method:"POST",
          body:formdata
        });
        const data=await res.json();
        if(!data.success){
          setGlobalerror(data);
        }
        onClose(); 

      }catch(e){
        if (e instanceof Error) {
          setGlobalerror(e.message);
        } else {
          setGlobalerror("Something went wrong.");
        }
      }finally{
        setLoading(false);
      }
      
    }



  return (
    <form className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg space-y-5"
    onSubmit={handleSubmit}>

      <h2 className="text-2xl font-bold text-gray-800">
        Add Food Item
      </h2>
      <h2 className="text-2sl font-bold text-red-800">
        {globalerror}
      </h2>

      {/* Food Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Food Name
        </label>
        <input
          type="text"
          name="name"
          value={food.name}
          onChange={handleChange}
          placeholder="Chicken Burger"
          className="w-full rounded-lg text-gray-700 border border-gray-300 px-4 py-2 outline-none focus:border-[#b5232a]"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={food.description}
          onChange={handleChange}
          rows={4}
          placeholder="Enter food description..."
          className="w-full rounded-lg text-gray-700 border border-gray-300 px-4 py-2 outline-none focus:border-[#b5232a]"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={food.price}
          onChange={handleChange}
          step="0.01"
          placeholder="799.99"
          className="w-full rounded-lg border text-gray-700 border-gray-300 px-4 py-2 outline-none focus:border-[#b5232a]"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>
        
        <select
          name="category"
          className="w-full rounded-lg border text-gray-700 border-gray-300 px-4 py-2 outline-none focus:border-[#b5232a]"
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

      {/* Image */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Food Image
        </label>

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 file:mr-4 file:rounded-lg file:border-0 file:bg-[#b5232a] file:px-4 file:py-2 file:text-white"
          onChange={handleImageChange}
        />
      </div>

      {/* Availability */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isAvailable"
          checked={food.isAvailable}
          onChange={handleChange}
          name="isAvailable"
          //defaultChecked
          className="h-5 w-5 accent-[#b5232a]"
          required
        />

        <label
          htmlFor="isAvailable"
          className="text-sm font-medium text-gray-700"
        >
          Available
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4">

        <button
          type="button"
          className="rounded-lg text-gray-700 border border-gray-300 px-5 py-2 font-medium hover:bg-gray-100"
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