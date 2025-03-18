"use client";

import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">
          {error === "CredentialsSignin"
            ? "Invalid email or password. Please try again."
            : "An unexpected error occurred. Please try again later."}
        </p>
        <a href="/auth/signin" className="mt-6 inline-block text-primary hover:underline">
          Go back to Sign In
        </a>
      </div>
    </div>
  );
}
