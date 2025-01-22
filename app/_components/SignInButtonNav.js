import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function SignInButtonNav({ closeSidebar }) {
  // Accept closeSidebar prop
  return (
    <Link className="hover:text-white" href="/login" onClick={closeSidebar}>
      {" "}
      {/* Close sidebar on click */}
      <button className="py-5 px-8 hover:bg-primary-green hover:text-white transition-colors text-primary-green flex items-center gap-4 font-semibold w-full">
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        <span>Sign in</span>
      </button>
    </Link>
  );
}

export default SignInButtonNav;
