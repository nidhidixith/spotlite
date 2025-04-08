"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/profile/74");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to Spotlite</h1>
      <button
        onClick={handleNavigate}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Profile
      </button>
    </div>
  );
}
