// app/users/password-reset/page.js
"use client";

import { useState } from "react";
import { supabaseData } from "../_lib/supabase"; // Import your supabase client
import bgImg from "@/public/bg.webp";
import Image from "next/image";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();

    const { error } = await supabaseData.auth.resetPasswordForEmail(email, {
      redirectTo: "https://staff.myboatclub.app/reset/", // Ensure this URL is correct
    });
    // https://staff.myboatclub.app/reset/
    // http://localhost:3000/reset/

    if (error) {
      setError("Error sending reset email.");
      return;
    }

    setMessage(
      "If this user exists they will get an email with a password reset link."
    );
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
        onSubmit={handlePasswordResetRequest}
      >
        <h1 className="text-primary-blue text-2xl font-bold mb-6">
          Request Password Reset
        </h1>
        {message && <p>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="space-y-4">
          <input
            className="bg-slate-100 p-2 w-full text-primary-blue rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-orange"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className={`bg-primary-orange text-white hover:bg-primary-yellow hover:text-primary-blue 
              w-1/2 mx-auto p-4 rounded-lg transition-all duration-300 font-bold
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2`}
            type="submit"
          >
            Send Reset Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetRequest;
