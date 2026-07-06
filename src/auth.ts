import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.email === "test@example.com" &&
          credentials.password === "password123"
        ) {
          return {
            id: "1",
            name: "Azeez Olawale",
            email: "test@example.com",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = nextUrl.pathname.startsWith("/login") ||
                         nextUrl.pathname.startsWith("/register");
      const isProtectedPage = nextUrl.pathname.startsWith("/dashboard") ||
                               nextUrl.pathname.startsWith("/profile");

      if (!isLoggedIn && isProtectedPage) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLoggedIn && isAuthPage) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
});