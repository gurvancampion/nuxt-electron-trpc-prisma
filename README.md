# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Create an `.env` file `cp .env.example .env`

```bash 

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
pnpm prisma migrate dev --name init
pnpm prisma generate
pnpm run dev
```

## Production

Build the application for production and package it with electron-builder

Currently it doesn't work yet, figuring out how the problem of paths after build

```bash
pnpm run build
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

