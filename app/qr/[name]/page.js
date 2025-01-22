import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

// Initialize Supabase client
const supabase = createClient();

export async function generateMetadata({ params }) {
  return {
    title: `Redirecting QR Code ${params["qr-number"]}`,
  };
}

export default async function QRRedirectPage({ params }) {
  const { "name": name } = await params;

  // Log to check if the name is being captured correctly
  console.log("QR Name:", name);

  // Fetch the URL from Supabase
  const { data, error } = await supabase
    .from("qr_codes")
    .select("url")
    .eq("name", name)
    .single(); // We are expecting only a single record

  // Check if there's an error or if data is not found
  if (error) {
    console.error("Error fetching data:", error);
    return <div>QR Code not found or invalid!</div>;
  }

  if (!data || !data.url) {
    console.error("URL not found for name:", name);
    return <div>URL not found for the provided QR Code.</div>;
  }

  // Redirect to the URL fetched from Supabase
  redirect(data.url);
 
}
