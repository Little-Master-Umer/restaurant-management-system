"use client";
import {useState } from "react";
import { useRouter} from "next/navigation";




export default function loginpage() {

    const router =useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading , setLoading]=useState(false);
    const [error, setError]=useState({
      username: "",
      password: "",
    });
    const [globalError, setglobalError]=useState("");

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();

        setglobalError("");
        setError({
               username:"",
               password:"",  
        });

        setLoading(true);

        try {
            const res=await fetch("api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    username,
                    password,
                }),
                
            });

            const data=await res.json();
            console.log("3. JSON parsed", data);
            if (!res.ok) {
             setError({
               username: data.error.username || "",
               password: data.error.password || "",
              
              });
              console.log(error.username);
              console.log(error.password);
              
              setglobalError("Login Failed");
             return;
            }
           

            console.log(data)
            router.push("/dashboard");
            router.refresh();       
        } catch (error) {
            setglobalError("Something went wrong.");
        }finally{
            setLoading(false);
        } 
    }
    return(
        <main className="min-h-screen flex items-center justify-center bg-gray-600">
            <form
        onSubmit={handleSubmit}
        className="w-full h-[500px] max-w-sm bg-gray-50 rounded-lg shadow-lg p-6 space-y-5 border-gray-200"
      >

        <h1 className="text-2xl font-bold text-center text-gray-900">
          Restaurant Admin
        </h1>

        {globalError && (
          <p className="text-red-600 text-sm">
            {globalError}
          </p>
        )}

        <div>

          <label className="block mb-1 text-black text-gray-500">
            Username
          </label>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded w-full p-2 text-black bg-white border-gray-300 focus:border-red-500 focus:ring-red-500"
            required
          />
          {error.username && (
          <p className="text-red-600 text-sm">
            {error.username}
          </p>
          )}


        </div>

        <div>

          <label className="block mb-1 text-black text-gray-500">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full p-2 text-black bg-white border-gray-300 focus:border-red-500 focus:ring-red-500"
            required
          />

          {error.password && (
          <p className="text-red-600 text-sm">
            {error.password}
          </p>
          )}


        </div>

        <button
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded my-15"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

        </main>    
    )


}