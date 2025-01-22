"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bgImg from "@/public/bg.webp";
import { login } from "./_lib/userActions";
import Link from "next/link";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Prefetch dashboard and handle mounting
  useEffect(() => {
    router.prefetch("/dashboard");
    setMounted(true);
  }, [router]);

  // Debounce error messages
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Don't proceed if already loading
    if (loading) return;

    try {
      setLoading(true);
      setErrorMessage(null);

      // Get form data efficiently
      const form = event.currentTarget;
      const formData = new FormData(form);

      // Basic client-side validation
      const email = formData.get("email");
      const password = formData.get("password");

      if (!email.includes("@")) {
        setErrorMessage("Please enter a valid email address");
        return;
      }

      if (password.length < 3) {
        setErrorMessage("Password must be at least 3 characters");
        return;
      }

      const result = await login(formData);

      if (result?.error) {
        setErrorMessage(result.error);
        // Focus the relevant input on error
        if (result.error.includes("email")) {
          form.elements.email.focus();
        } else if (result.error.includes("password")) {
          form.elements.password.focus();
        }
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission with enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      e.currentTarget.form.requestSubmit();
    }
  };

  // Prevent form submission while loading
  if (!mounted) {
    return null; // Prevent flash of content
  }

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
        onSubmit={handleSubmit}
        noValidate // We're handling validation in JS
      >
        <h1 className="text-primary-blue text-2xl font-bold mb-6">
          Please login:
        </h1>

        {errorMessage && (
          <div
            role="alert"
            className="text-red-500 bg-red-50 p-3 rounded mb-4 animate-shake"
          >
            {errorMessage}
          </div>
        )}

        <div className="space-y-4">
          <input
            className="bg-slate-100 p-2 w-full text-primary-blue rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-orange"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            autoComplete="email"
            disabled={loading}
            onKeyDown={handleKeyDown}
            aria-label="Email address"
          />

          <input
            className="bg-slate-100 p-2 w-full text-primary-blue rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-orange"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            disabled={loading}
            onKeyDown={handleKeyDown}
            aria-label="Password"
          />
          <div className="flex justify-between gap-12 items-center">
            <button
              className={`bg-primary-orange text-white hover:bg-primary-yellow hover:text-primary-blue 
              w-1/2 p-4 rounded-lg transition-all duration-300 font-bold
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2`}
              type="submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Log in"
              )}
            </button>
            <Link
              className="bg-primary-blue text-white hover:bg-primary-yellow hover:text-primary-blue 
              w-1/2 p-4 rounded-lg transition-all duration-300 font-bold
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 text-center"
              href="/request-reset"
            >
              Reset Password
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}


