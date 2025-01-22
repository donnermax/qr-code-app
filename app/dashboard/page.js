import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Link from "next/link";
import { getBookingsByDate } from "../_lib/data-service";
import QRCodeGenerator from "../_components/QRCodeGenerator";


// Get today's date in UTC (format YYYY-MM-DD)
const today = new Date();
const year = today.getUTCFullYear();
const month = String(today.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
const day = String(today.getUTCDate()).padStart(2, "0");
const selectedDate = `${year}-${month}-${day}`;

export default async function dashboard() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  
  return (
    <div className="md:w-2/3 md:mx-auto mt-12">
      <h1 className="font-bold text-4xl mb-1">This is your dashboard</h1>
      <h2 className="text-[#ccc] text-xl font-bold">Create and manage all your QR codes here.</h2>
      <div className="mt-5 flex flex-col text-center gap-4 uppercase">
        <QRCodeGenerator />

      </div>
    </div>
  );
}
