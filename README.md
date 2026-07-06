# User Information Management System

A production-ready full-stack app for self-service record keeping. Users sign up, verify
their email, log in, and manage their own personal records — all backed by **Supabase**
(Postgres + Auth) with **no custom backend server**.

- **Frontend:** React 18, Vite, React Router, Tailwind CSS, Supabase JS SDK
- **Backend:** Supabase (Auth + Postgres + Row Level Security) — no Node/Express/JSON Server
- **Deployment:** Frontend on Render (static site) · Backend on Supabase Cloud

> Supabase is a hosted Backend-as-a-Service and isn't something you deploy to Render — only the
> React frontend is deployed there. The Supabase project itself lives on Supabase Cloud, and the
> frontend talks to it directly over HTTPS using the anon key + Row Level Security.

## Project structure

```
user-information-management-system/
├── frontend/              React app (deployed to Render)
│   └── src/
│       ├── components/    Navbar, Sidebar, Loader, ProtectedRoute, forms, table, modal…
│       ├── pages/         Login, Signup, ForgotPassword, ResetPassword, Dashboard,
│       │                  AddRecord, ViewRecords, EditRecord
│       ├── context/       AuthContext, ToastContext
│       └── services/      supabase.js (client + CRUD helpers)
├── supabase/
│   └── schema.sql         Table, indexes, trigger, RLS policies
└── render.yaml             Render static-site deployment config
```

## 1. Set up Supabase (backend)

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the contents of [`supabase/schema.sql`](./supabase/schema.sql).
   It creates the `submissions` table, an `updated_at` trigger, and Row Level Security
   policies scoping every read/write to `auth.uid()`.
3. In **Authentication → Providers**, confirm Email is enabled.
4. In **Authentication → URL Configuration**, set:
   - **Site URL:** your Render URL (e.g. `https://your-app.onrender.com`), or
     `http://localhost:5173` while developing locally.
   - **Redirect URLs:** add both the local and production URLs so email
     confirmation and password-reset links redirect correctly.
5. Copy your **Project URL** and **anon public key** from **Project Settings → API** — you'll
   need them in step 2.

## 2. Run the frontend locally

```bash
cd frontend
npm install
cp .env.example .env
# edit .env and paste your Supabase URL + anon key
npm run dev
```

Visit `http://localhost:5173`. Sign up, verify your email via the link Supabase sends, then
log in.

### Environment variables

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The anon key is safe to expose in a frontend build — Row Level Security is what actually
restricts access to each user's own rows.

## 3. Deploy the frontend to Render

**Using `render.yaml` (recommended):**

1. Push this repo to GitHub/GitLab.
2. In Render, choose **New → Blueprint** and point it at the repo — it will read
   `render.yaml` automatically.
3. When prompted, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your Supabase values.
4. Deploy. The blueprint already includes the SPA rewrite rule (`/* → /index.html`) so client-side
   routes like `/records/new` work on refresh.

**Manual setup (no blueprint):**

1. **New → Static Site**, connect the repo.
2. **Root directory:** `frontend`
3. **Build command:** `npm install && npm run build`
4. **Publish directory:** `dist`
5. Add the two environment variables above.
6. Under **Redirects/Rewrites**, add: source `/*` → destination `/index.html`, type **Rewrite**.
7. Back in Supabase, add your live Render URL to **Authentication → URL Configuration** (Site
   URL + Redirect URLs) so verification/reset emails point at production, not localhost.

## Features

- Self-service sign up with email verification
- Login / logout with persistent sessions (survives refresh)
- Forgot password → email link → reset password
- Protected routes that redirect unauthenticated visitors to `/login`
- Dashboard with entry count and most recent record
- Add / view / search / paginate / edit / delete personal records
- Client-side validation (required fields, email format, 10-digit mobile number)
- Toast notifications, loading states, confirmation modal before delete, error boundary
- Row Level Security ensures the database itself blocks cross-user access, even if the
  frontend were bypassed

## Notes on scope

This is a personal-records manager: every user only ever sees and edits their own
`submissions` rows, enforced by RLS at the database layer, not just in the UI. Deleting a
user (`auth.users`) cascades and removes their submissions. There is no admin/shared view in
this build — that would need a separate `role` column and adjusted policies if you want it
later.
