import { cookies } from "next/headers";
import { createHash } from "crypto";

/**
 * Minimal single-password gate for the poster admin hub. The cookie stores a
 * salted hash of the password (never the password itself); the middleware-free
 * check just compares it to the expected token.
 *
 * Set ADMIN_PASSWORD (and optionally ADMIN_SECRET) in the environment for
 * production. The local defaults below exist only so dev works out of the box.
 */
const SECRET = process.env.ADMIN_SECRET ?? "rokk-poster-salt-2026";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "rokk2026";
export const ADMIN_COOKIE = "rokk_admin";

export function adminToken(): string {
  return createHash("sha256").update(`${ADMIN_PASSWORD}::${SECRET}`).digest("hex");
}

export function isAdmin(): boolean {
  return cookies().get(ADMIN_COOKIE)?.value === adminToken();
}
