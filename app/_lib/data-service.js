import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const uploadFileToBucket = async (filePath, file) => {
  if (typeof filePath !== "string") {
    console.error("Invalid filePath:", filePath);
    throw new Error("filePath must be a string.");
  }

  if (!(file instanceof Blob)) {
    console.error("Invalid file:", file);
    throw new Error("file must be a valid Blob.");
  }

  try {
    const { data, error } = await supabase.storage
      .from("qrcode_bucket")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading file:", error.message);
      throw new Error("Failed to upload file to bucket.");
    }

    return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${data.path}`;
  } catch (error) {
    console.error("Error during file upload:", error.message);
    throw error;
  }
};
