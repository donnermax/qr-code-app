"use client";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import bgImg from "@/public/bg.webp";
import { supabaseData } from "../_lib/supabase";
// import { login } from "./_lib/userActions";

export default function Reset() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [mounted, setMounted] = useState(false);
  const [data, setData] = useState({ password: "", confirmPassword: "" });
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const confirmPasswords = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setErrorMessage("Your passwords don't match");
      return errorMessage;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    const { data: resetData, error } = await supabaseData.auth.updateUser({
      password: data.password,
    });
    if (resetData) redirect("/dashboard");
    if (error) console.log(error);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="md:w-1/3 md:mx-auto mt-[35%] md:mt-[10%]">
      <Image
        src={bgImg}
        fill
        placeholder="blur"
        quality={80}
        priority // Add priority for LCP improvement
        sizes="(max-width: 768px) 100vw, 33vw" // Add sizes for better resource loading
        className="object-cover object-top"
        alt="Boat Club Sunna"
      />
      <form
        className="relative flex z-10 flex-col p-8 bg-white rounded-xl shadow-lg animate-fadeIn"
        // onSubmit={handleSubmit}
      >
        <h1 className="text-primary-blue text-2xl font-bold mb-6">
          Enter your new password:
        </h1>

        {errorMessage && (
          <div
            role="alert"
            className="text-red-500 bg-red-50 p-3 rounded mb-4 animate-shake"
          >
            {errorMessage}
          </div>
        )}

        <div className="space-y-4 items-center flex flex-col">
          <input
            className="bg-slate-100 p-2 w-full text-primary-blue rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-orange"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={data?.password}
            onChange={handleChange}
          />
          <input
            className="bg-slate-100 p-2 w-full text-primary-blue rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-orange"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            required
            onChange={handleChange}
            value={data?.confirmPassword}
          />
          <div
            className="cursor-pointer md:hover:underline"
            onClick={() => setShowPassword(!showPassword)}
          >
            <p>Show Passwords</p>
          </div>

          <button
            className="bg-primary-orange text-white hover:bg-primary-yellow hover:text-primary-blue 
              w-1/2 mx-auto text-center p-4 rounded-lg transition-all duration-300 font-bold
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2"
            // type="submit"
            onClick={confirmPasswords}
            // disabled={loading}
            // aria-busy={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Resetting password...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
// "use client";
// import { useState, useEffect } from "react";
// import { redirect, useRouter } from "next/navigation";
// import Image from "next/image";
// import bgImg from "@/public/bg.webp";
// import { supabaseData } from "../_lib/supabase";
// // import { login } from "./_lib/userActions";
// export default function Reset() {
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [data, setData] = useState({ password: "", confirmPassword: "" });
//   const [success, setSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const confirmPasswords = async (e) => {
//     e.preventDefault();
//     const { password, confirmPassword } = data;
//     if (password.length < 6) {
//       setErrorMessage("Password must be at least 6 characters long.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setErrorMessage(`Your passwords don't match`);
//       return errorMessage;
//     }
//     const { data: resetData, error } = await supabaseData.auth.updateUser({
//       password: data.password,
//     });
//     if (resetData) {
//       redirect("/dashboard");
//     }
//     if (error) console.log(error);
//   };
//   const handleChange = (e) => {
//     e.preventDefault();
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   return (
//     <div className="md:w-1/3 md:mx-auto mt-[35%] md:mt-[10%]">
//       <Image
//         src={bgImg}
//         fill
//         placeholder="blur"
//         quality={80}
//         priority // Add priority for LCP improvement
//         sizes="(max-width: 768px) 100vw, 33vw" // Add sizes for better resource loading
//         className="object-cover object-top"
//         alt="Boat Club Sunna"
//       />
//       <form
//         className="relative flex z-10 flex-col p-8 bg-white rounded-xl shadow-lg animate-fadeIn"
//         // onSubmit={handleSubmit}
//       >
//         <h1 className="text-primary-blue text-2xl font-bold mb-6">
//           Enter your new password:
//         </h1>
//         {errorMessage && (
//           <div
//             role="alert"
//             className="text-red-500 bg-red-50 p-3 rounded mb-4 animate-shake"
//           >
//             {errorMessage}
//           </div>
//         )}
//         <div className="space-y-4 items-center flex flex-col">
//           <input
//             className="bg-slate-100 p-2 w-full text-primary-blue rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-orange"
//             id="password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             required
//             value={data?.password}
//             autoComplete="current-password"
//             disabled={loading}
//             onChange={handleChange}
//             aria-label="Password"
//           />
//           <input
//             className="bg-slate-100 p-2 w-full text-primary-blue rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-orange"
//             id="confirmPassword"
//             name="confirmPassword"
//             type={showPassword ? "text" : "password"}
//             placeholder="Confirm Password"
//             required
//             onChange={handleChange}
//             value={data?.confirmPassword}
//             autoComplete="current-confirmPassword"
//             disabled={loading}
//             aria-label="confirmPassword"
//           />
//           <div
//             className="cursor-pointer md:hover:underline"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             <p>Show Passwords</p>
//           </div>
//           <button
//             className={`bg-primary-orange text-white hover:bg-primary-yellow hover:text-primary-blue
//               w-1/2 mx-auto text-center p-4 rounded-lg transition-all duration-300 font-bold
//               disabled:opacity-50 disabled:cursor-not-allowed
//               focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2`}
//             // type="submit"
//             onClick={confirmPasswords}
//             disabled={loading}
//             aria-busy={loading}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                   />
//                 </svg>
//                 Resetting password...
//               </span>
//             ) : (
//               "Reset Password"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import bgImg from "@/public/bg.webp";
// import { supabaseData } from "../_lib/supabase";
// export default function Reset() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState({ password: "", confirmPassword: "" });
//   const [success, setSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   useEffect(() => {
//     if (!token) {
//       setErrorMessage("Invalid or missing token.");
//     }
//   }, [token]);
//   const confirmPasswords = async (e) => {
//     e.preventDefault();
//     const { password, confirmPassword } = data;
//     if (!token) {
//       setErrorMessage("Invalid or missing token.");
//       return;
//     }
//     if (password.length < 6) {
//       setErrorMessage("Password must be at least 6 characters long.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setErrorMessage(`Your passwords don't match`);
//       return;
//     }
//     try {
//       setLoading(true);
//       const { data: resetData, error } = await supabaseData.auth.updateUser({
//         password: data.password,
//         token,
//       });
//       if (error) {
//         setErrorMessage(error.message || "An error occurred.");
//         setLoading(false);
//         return;
//       }
//       setSuccess(true);
//       redirect("/dashboard");
//     } catch (error) {
//       setErrorMessage(error.message || "An unexpected error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   return (
//     <div className="md:w-1/3 md:mx-auto mt-[35%] md:mt-[10%]">
//       <Image
//         src={bgImg}
//         fill
//         placeholder="blur"
//         quality={80}
//         priority
//         sizes="(max-width: 768px) 100vw, 33vw"
//         className="object-cover object-top"
//         alt="Boat Club Sunna"
//       />
//       <form className="relative flex z-10 flex-col p-8 bg-white rounded-xl shadow-lg animate-fadeIn">
//         <h1 className="text-primary-blue text-2xl font-bold mb-6">
//           Enter your new password:
//         </h1>
//         {errorMessage && (
//           <div
//             role="alert"
//             className="text-red-500 bg-red-50 p-3 rounded mb-4 animate-shake"
//           >
//             {errorMessage}
//           </div>
//         )}
//         <div className="space-y-4 items-center flex flex-col">
//           <input
//             className="bg-slate-100 p-2 w-full text-primary-blue rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-orange"
//             id="password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             required
//             value={data?.password}
//             autoComplete="current-password"
//             disabled={loading}
//             onChange={handleChange}
//             aria-label="Password"
//           />
//           <input
//             className="bg-slate-100 p-2 w-full text-primary-blue rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-orange"
//             id="confirmPassword"
//             name="confirmPassword"
//             type={showPassword ? "text" : "password"}
//             placeholder="Confirm Password"
//             required
//             onChange={handleChange}
//             value={data?.confirmPassword}
//             autoComplete="current-confirmPassword"
//             disabled={loading}
//             aria-label="Confirm Password"
//           />
//           <div
//             className="cursor-pointer md:hover:underline"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             <p>Show Passwords</p>
//           </div>
//           <button
//             className={`bg-primary-orange text-white hover:bg-primary-yellow hover:text-primary-blue
//               w-1/2 mx-auto text-center p-4 rounded-lg transition-all duration-300 font-bold
//               disabled:opacity-50 disabled:cursor-not-allowed
//               focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2`}
//             onClick={confirmPasswords}
//             disabled={loading}
//             aria-busy={loading}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                   />
//                 </svg>
//                 Resetting password...
//               </span>
//             ) : (
//               "Reset Password"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
