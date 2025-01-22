"use client";

import React, { useState } from "react";
import QRCodeCanvas from "./QRCodeCanvas";
import { createClient } from "@/utils/supabase/client"; 

const supabase = await createClient();
const QRCodeGenerator = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const handleGenerate = async () => {
    if (!name || !url) {
      alert("Please provide both a name and a URL.");
      return;
    }
  
    // Fetch the authenticated user's details
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
  
    if (userError || !user) {
      console.error("Error retrieving user:", userError?.message || "No user found.");
      alert("You must be logged in to generate a QR code.");
      return;
    }
  
    const userId = user.id; // User's UUID
    // const redirectUrl = `theqrco.com/qr/${name}`;
    // const redirectUrl = `http://localhost:3000/qr/${name}`;
    const redirectUrl = `https://qr-code-od1tobv9x-maxs-projects-142235fc.vercel.app/qr/${name}`;
    setQrUrl(redirectUrl);
  
    // Insert data into the Supabase table
    try {
      const { data, error } = await supabase.from("qr_codes").insert([
        {
          user_id: userId, // Associate the QR code with the user
          name: name,
          url: url,
          qr_url: name,
        },
      ]);
  
      if (error) {
        console.error("Error inserting data into Supabase:", error.message);
        alert("Failed to save QR code details. Please try again.");
      } else {
        console.log("Data saved to Supabase:", data);
        alert("QR code details saved successfully!");
      }
    } catch (err) {
      console.error("Error interacting with Supabase:", err.message);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  

  return (
    <div className="text-left capitalize">
      <h1 className="text-2xl font-semibold mb-2">QR Code Generator</h1>
      <div className="w-2/3 flex gap-4 flex-col">
        <div className="flex justify-between items-center">
          <label>Name for QR Code:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., my-website"
            className="border md:w-[300px] p-2 mx-2"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <label>URL to Redirect To:</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., https://example.com"
            className="border md:w-[300px] p-2 mx-2"
            required
          />
        </div>
        <button
          onClick={handleGenerate}
          className="cursor-pointer bg-primary-blue md:hover:bg-primary-orange transition-all duration-300 py-4 rounded-xl text-white text-xl font-bold"
        >
          Generate QR Code
        </button>
      </div>
      {qrUrl && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>QR Code for {name}:</h3>
          <QRCodeCanvas value={qrUrl} />
          <p>
            Scan the code or visit: <strong>{qrUrl}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
