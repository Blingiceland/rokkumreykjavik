import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_PASSWORD, ADMIN_COOKIE, adminToken, isAdmin } from "@/lib/admin-auth";
import { AdminHub } from "@/components/admin/admin-hub";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

async function login(formData: FormData) {
  "use server";
  const pw = String(formData.get("password") ?? "");
  if (pw === ADMIN_PASSWORD) {
    cookies().set(ADMIN_COOKIE, adminToken(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/admin");
  }
  redirect("/admin?villa=1");
}

async function logout() {
  "use server";
  cookies().delete(ADMIN_COOKIE);
  redirect("/admin");
}

export default function AdminPage({ searchParams }: { searchParams: { villa?: string } }) {
  if (isAdmin()) return <AdminHub logout={logout} />;

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form action={login} className="w-full max-w-sm">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon">Admin · plaköt</p>
        <h1 className="mt-2 font-display text-4xl uppercase leading-none text-bone">Innskráning</h1>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-bone-faint">
          Sláðu inn lykilorð til að opna plakat-miðstöðina.
        </p>
        <input
          type="password"
          name="password"
          autoFocus
          placeholder="Lykilorð"
          className="mt-5 w-full border-2 border-bone bg-base-card px-3 py-2.5 font-mono text-sm text-bone placeholder:text-bone-faint focus:border-neon focus:outline-none"
        />
        {searchParams.villa === "1" && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-neon">Rangt lykilorð</p>
        )}
        <button className="mt-4 w-full border-2 border-bone bg-bone px-3 py-2.5 font-display text-lg uppercase tracking-tight text-[color:rgb(var(--c-base))] transition-colors hover:border-neon hover:bg-neon">
          Skrá inn
        </button>
      </form>
    </main>
  );
}
