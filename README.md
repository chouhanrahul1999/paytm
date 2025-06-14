# Paytm-like Digital Wallet Platform

A modern, full-stack digital wallet system inspired by Paytm, supporting user and merchant portals, secure authentication, real-time balance updates, and seamless bank integration. Built for scalability and maintainability using a monorepo architecture.

## Features

- **User & Merchant Portals:** Separate Next.js apps for users and merchants with custom dashboards.
- **Authentication:** Secure login with NextAuth.js (Google OAuth) and session management.
- **Wallet & Transactions:** Add money, view balance, transaction history, and P2P transfers.
- **Bank Integration:** Webhook-based flow for real-time balance updates from supported banks.
- **Admin/Bank Webhook:** Express.js service to handle bank callbacks and update user balances.
- **Shared UI & Logic:** Reusable components and logic via Turborepo monorepo structure.

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js, NextAuth.js, REST APIs
- **Database:** PostgreSQL, Prisma ORM
- **Monorepo:** Turborepo for code sharing and scalability

## Project Structure

```
/paytm
├── apps
│   ├── user-app         # User dashboard (Next.js)
│   ├── merchant-app     # Merchant dashboard (Next.js)
│   └── bank-webhook     # Express.js webhook for bank integration
├── packages
│   ├── db               # Prisma schema, migrations, and client
│   ├── ui               # Shared UI components
│   └── ...
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd paytm
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in each app and fill in required values (Google OAuth, DB connection, NextAuth secret, etc).
4. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init --schema packages/db/prisma/schema.prisma
   ```
5. **Start the apps:**
   ```bash
   # In separate terminals
   npm run dev --workspace=apps/user-app
   npm run dev --workspace=apps/merchant-app
   npm run dev --workspace=apps/bank-webhook
   ```

## Usage
- **User App:** Sign up, add money, view balance, and see transaction history.
- **Merchant App:** Manage merchant-specific features (extend as needed).
- **Bank Webhook:** Receives callbacks from supported banks and updates user balances in real time.

## Contributing
Pull requests and issues are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT

---

**Developed by [Your Name] — June 2025**
