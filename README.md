# 🔐 AuthSystem — Authentication System

A fully functional authentication system built with Next.js 15, NextAuth.js v4 and TypeScript. Features protected routes, session management, credential-based login and a responsive dark-themed UI.

## 🚀 Live Demo

🔗 **[auth-system-9bo7.vercel.app](https://auth-system-9bo7.vercel.app/)**

**Test credentials:**
- Email: `test@example.com`
- Password: `password123`

---

## 📸 Features

- 🏠 **Landing Page** — public homepage with Sign In and Create Account links
- 🔑 **Login Page** — credential-based authentication with NextAuth.js
- 📝 **Register Page** — full form validation including password match check
- 🛡️ **Dashboard** — protected page showing session user data
- 👤 **Profile Page** — protected page with user details and avatar
- 🔀 **Smart Redirects** — logged in users can't visit login/register, logged out users can't visit dashboard/profile
- 🧭 **Dynamic Navbar** — shows different links based on auth state
- 🚪 **Sign Out** — clears session and redirects to home

---

## 🔒 How Authentication Works

```
User fills login form
        ↓
NextAuth calls authorize() in auth.ts
        ↓
Credentials valid → JWT session created → cookie set
        ↓
router.push("/dashboard")
        ↓
Middleware checks session on every request
        ↓
Protected page + no session → redirect to /login
Auth page + active session → redirect to /dashboard
```

---

## 🛡️ Route Protection

Middleware runs before every request and enforces these rules:

| User State | Visits | Result |
|---|---|---|
| Logged out | `/dashboard` | Redirects to `/login` |
| Logged out | `/profile` | Redirects to `/login` |
| Logged in | `/login` | Redirects to `/dashboard` |
| Logged in | `/register` | Redirects to `/dashboard` |
| Anyone | `/` | Allowed through |

---

## 🏗️ Architecture — Server + Client Component Split

Login and Register pages use a **Server + Client Component split** — a key Next.js pattern:

```
login/
├── page.tsx       → Server Component (checks session, redirects if logged in)
└── LoginForm.tsx  → Client Component (form state, signIn, useRouter)

register/
├── page.tsx       → Server Component (checks session, redirects if logged in)
└── RegisterForm.tsx → Client Component (form state, validation)
```

**Why this matters:**

```
❌ Single Client Component:
Browser loads → JS runs → session checked → redirect if logged in
(user might briefly see the login page before redirect)

✅ Server + Client split:
Server checks session first → redirect before page loads
(user never sees the login page at all)
```

The Server Component handles the auth check using `getServerSession` — this runs on the server before anything is sent to the browser. The Client Component handles form interactivity — `useState`, `signIn`, `useRouter` — which require the browser.

This is the **island architecture** pattern — server components handle data and auth checks, small client components handle interactivity.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Framework — App Router, SSR |
| NextAuth.js v4 | Authentication — sessions, JWT |
| TypeScript | Type safety throughout |
| Tailwind CSS | Utility-first styling |
| Middleware | Route protection at the edge |

---

## ⚛️ Concepts Demonstrated

- NextAuth.js v4 — `CredentialsProvider`, `authOptions`, `getServerSession`
- Server + Client Component split — server handles auth checks, client handles interactivity
- Island architecture — minimal client JavaScript, maximum server rendering
- JWT session management — token-based authentication
- Next.js Middleware — edge-level route protection with `getToken`
- Server Components — session checking with `getServerSession`
- Client Components — `useSession` for dynamic navbar
- `SessionProvider` — sharing session across client components
- Protected routes — server-side redirect with `redirect()` from Next.js
- Controlled forms — validation with inline error messages
- `useRouter` — programmatic navigation after login
- `force-dynamic` — preventing static generation on auth pages

---

## 📁 Project Structure

```
src/
├── auth.ts                          → NextAuth config + authOptions
├── middleware.ts                    → Route protection logic
├── app/
│   ├── layout.tsx                   → Root layout with SessionProvider + Navbar
│   ├── page.tsx                     → Landing page (public)
│   ├── login/
│   │   ├── page.tsx                 → Server Component (session check + redirect)
│   │   └── LoginForm.tsx            → Client Component (form state + signIn)
│   ├── register/
│   │   ├── page.tsx                 → Server Component (session check + redirect)
│   │   └── RegisterForm.tsx         → Client Component (form state + validation)
│   ├── dashboard/
│   │   └── page.tsx                 → Protected dashboard
│   ├── profile/
│   │   └── page.tsx                 → Protected profile
│   └── api/
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts         → NextAuth API handler
└── components/
    ├── Navbar.tsx                   → Dynamic navbar (auth-aware)
    ├── SignOutButton.tsx             → Client sign out button
    └── SessionProvider.tsx          → Wraps app with NextAuth SessionProvider
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Oluwamighty/auth-system.git

# Navigate into the project
cd auth-system

# Install dependencies
npm install

# Create .env.local file
touch .env.local
```

Add these to `.env.local`:
```env
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
```

Generate a secret:
```bash
npx auth secret
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

When deploying to Vercel, add these environment variables in your project settings:

```
NEXTAUTH_SECRET=your_secret_value
NEXTAUTH_URL=https://your-app.vercel.app
```

---

## 🔮 Future Improvements

- Connect to a real database (PostgreSQL + Prisma)
- Hash passwords with bcrypt
- Google OAuth provider
- Email verification
- Password reset flow
- Remember me functionality

---

## 👨‍💻 Author

**Ojo Azeez Olawale**
- GitHub: [@Oluwamighty](https://github.com/Oluwamighty)
- Portfolio: [oluwamighty.github.io/portfolio](https://oluwamighty.github.io/portfolio)
- Email: olawaleojo42@gmail.com

---

## 📄 License

MIT License — feel free to use this project as a reference or starting point.