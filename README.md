# NextJS - Dashboard 📊

![nextjs-dashboard-stevemoya vercel app_](https://github.com/SteveMoya/nextjs-dashboard/assets/114698709/dc70a673-652b-4ed2-8711-575f96103fd7)


## Ejemplo en vivo


[![Website](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://nextjs-dashboard-stevemoya.vercel.app/)

A modern dashboard application built with Next.js 14, featuring authentication, dark mode, and various management tools.

## Features

- ⚡ **Next.js 14** with App Router
- 🔐 **Authentication** using NextAuth.js
- 🌓 **Dark Mode** support
- 📊 **Dashboard Analytics**
- 💳 **Invoice Management**
- 👥 **Customer Management**
- 🔔 **Toast Notifications** with Sonner
- 🎨 **Tailwind CSS** for styling
- 🔍 **Search Functionality**
- 📱 **Responsive Design**

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Sonner](https://sonner.emilkowal.ski/)
- [Vercel Postgres](https://vercel.com/postgres)
- [Zod](https://zod.dev/)

## IDE 💻

![VisualStudioCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)


## Getting Started

### Prerequisites

- Node.js 20 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SteveMoya/nextjs-dashboard.git
cd nextjs-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Copy the example environment file:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your configuration

5. Set up the database:
```bash
npm run seed
```

6. Start the development server:
```bash
npm run dev
```