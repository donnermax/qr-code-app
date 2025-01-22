import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

import { signout } from "../_lib/userActions";
import { revalidatePath } from "next/cache";

function SignOutButton({ closeSidebar }) {
  const handleSignOut = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      closeSidebar(); // Close the sidebar after sign out
      await signout({ redirectTo: "/" }); // Sign out and redirect
      revalidatePath("/");
    } catch (error) {
      console.error("Sign out failed:", error); // Handle sign out error
    }
  };

  return (
    <button
      onClick={handleSignOut} // Use button's onClick instead of form
      className="py-5 px-8 hover:bg-primary-100 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full"
    >
      <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-orange" />
      <span className="text-primary-orange">Sign out</span>
    </button>
  );
}

export default SignOutButton;
