import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold mt-[20%]">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-primary-orange text-white hover:bg-primary-yellow transition-all hover:text-primary-blue duration-300 px-6 py-3 text-lg"
      >
        Go back to the dashboard
      </Link>
    </main>
  );
}

export default NotFound;
