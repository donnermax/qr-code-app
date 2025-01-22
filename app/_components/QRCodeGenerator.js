"use client";

import React, { useState, useEffect } from "react";
import QRCodeCanvas from "./QRCodeCanvas";
import { createClient } from "@/utils/supabase/client";
import debounce from "lodash.debounce";

const supabase = await createClient();

const QRCodeGenerator = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [isNameTaken, setIsNameTaken] = useState(false);
  const [isCheckingName, setIsCheckingName] = useState(false);

  // Function to check name availability
  const checkNameAvailability = debounce(async (nameToCheck) => {
    if (!nameToCheck) {
      setIsNameTaken(false);
      return;
    }

    setIsCheckingName(true);

    const { data: existingName, error } = await supabase
      .from("qr_codes")
      .select("name")
      .eq("name", nameToCheck)
      .single();

    setIsCheckingName(false);

    if (error && error.code !== "PGRST116") {
      console.error("Error checking name uniqueness:", error.message);
      setIsNameTaken(false); // Assume the name is not taken if there's an error
    } else {
      setIsNameTaken(!!existingName);
    }
  }, 500); // Debounce with a delay of 500ms

  // Update name state and check availability
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    checkNameAvailability(newName);
  };

  const handleGenerate = async () => {
    if (!name || !url) {
      alert("Please provide both a name and a URL.");
      return;
    }

    if (isNameTaken) {
      alert("The name is already taken. Please choose a different name.");
      return;
    }

    // Fetch the authenticated user's details
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error(
        "Error retrieving user:",
        userError?.message || "No user found."
      );
      alert("You must be logged in to generate a QR code.");
      return;
    }

    const userId = user.id; // User's UUID

    // Dynamically get the current domain
    const redirectUrl = `${window.location.origin}/qr/${name}`;
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
      <div className="md:w-2/3 w-full flex gap-4 flex-col">
        <div className="flex justify-between items-center relative">
          <label>Name for QR Code:</label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="e.g., my-website"
              className="border md:w-[300px] p-2 mx-2"
              required
            />
          </div>
          <div className="absolute top-[-17px] right-2 text-sm">
            {isCheckingName ? (
              ""
            ) : isNameTaken ? (
              <span className="text-red-500">Name is taken</span>
            ) : name ? (
              ""
            ) : null}
          </div>
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
          className={`cursor-pointer ${
            isNameTaken
              ? "cursor-not-allowed bg-gray-400"
              : "bg-primary-blue md:hover:bg-primary-orange"
          } transition-all duration-300 py-4 rounded-xl text-white text-xl font-bold`}
          disabled={isCheckingName || isNameTaken}
        >
          Generate QR Code
        </button>
      </div>
      {qrUrl && (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <div className="mx-auto">
          <QRCodeCanvas value={qrUrl} />
          </div>
          <p>
            Scan the code or visit: <strong>{qrUrl}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
