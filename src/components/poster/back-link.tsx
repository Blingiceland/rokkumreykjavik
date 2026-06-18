"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/** Go back to wherever you came from (the /artist hub, the schedule, …), or
 * fall back to the hub when the poster was opened directly via a shared link. */
export function BackLink() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) router.back();
        else router.push("/artist");
      }}
      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone-dim transition-colors hover:text-neon"
    >
      <ArrowLeft size={14} /> Til baka
    </button>
  );
}
