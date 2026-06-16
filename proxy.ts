import { withAuth } from "next-auth/middleware";

// Protect /admin and all sub-paths EXCEPT /admin/login.
// The negative lookahead (?!login) ensures /admin/login remains publicly
// reachable — users can reach the sign-in page without triggering a redirect loop.
export const proxy = withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
