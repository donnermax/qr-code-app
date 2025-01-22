"use client";

import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { createClient } from "@/utils/supabase/client";
import debounce from "lodash.debounce";

const supabase = await createClient();

const QRCodeGenerator = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [isNameTaken, setIsNameTaken] = useState(false);
  const [isCheckingName, setIsCheckingName] = useState(false);
  const qrCodeRef = useRef(null); // Ref for the QR code canvas

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
      setIsNameTaken(false);
    } else {
      setIsNameTaken(!!existingName);
    }
  }, 500);

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

    const userId = user.id;
    const redirectUrl = `${window.location.origin}/qr/${name}`;
    setQrUrl(redirectUrl);

    try {
      const { data, error } = await supabase.from("qr_codes").insert([
        {
          user_id: userId,
          name: name,
          url: url,
          qr_url: name,
        },
      ]);

      if (error) {
        console.error("Error inserting data into Supabase:", error.message);
        alert("Failed to save QR code details. Please try again.");
      } else {
        alert("QR code details saved successfully!");
      }
    } catch (err) {
      console.error("Error interacting with Supabase:", err.message);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleDownload = () => {
    if (!qrCodeRef.current) return;

    // Convert SVG to Canvas
    const svg = qrCodeRef.current.querySelector("svg");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();

    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = svg.clientWidth;
      canvas.height = svg.clientHeight;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const link = document.createElement("a");
      link.download = `${name || "qr-code"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = url;
  };

  return (
    <div className="text-left capitalize my-4">
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
        <div style={{ marginTop: "30px", textAlign: "center" }} ref={qrCodeRef}>
          <QRCode className="mx-auto" value={qrUrl} size={256} />
          <p>
            Scan the code or visit: <strong>{qrUrl}</strong>
          </p>
          <button
            onClick={handleDownload}
            className="bg-primary-blue hover:bg-primary-orange text-white py-2 px-4 rounded mt-4"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
