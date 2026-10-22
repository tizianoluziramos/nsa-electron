<div align="center">

<img src="./public/favicon.svg" alt="NSA Desktop logo" height="96" />

# NSA Desktop Environment

A fullscreen desktop-environment experience built with React and Electron, featuring a custom cursor, restricted-access login, taskbar, and start menu.

[![Build Linux AppImage](https://img.shields.io/github/actions/workflow/status/tizianoluziramos/nsa-electron/build-linux.yml?style=flat-square&label=Build)](https://github.com/tizianoluziramos/nsa-electron/actions)
![Node.js](https://img.shields.io/badge/Node.js->=20-3c873a?style=flat-square)
![Electron](https://img.shields.io/badge/Electron-45-47848f?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?style=flat-square&logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-required-f69220?style=flat-square)

[Features](#features) • [Getting started](#getting-started) • [Run locally](#run-locally) • [Build](#build) • [Project structure](#project-structure)

</div>

## Overview

NSA Desktop Environment is a desktop-like web application packaged with Electron. It renders a fullscreen, kiosk-style interface with a custom animated cursor, a wallpaper, a restricted-access login screen, and an authenticated desktop containing a taskbar with a live clock and a start menu with logout. DevTools and the context menu are disabled, and zoom is prevented to keep the immersive desktop feel.

## Features

- Fullscreen, kiosk-style Electron window with the application menu removed
- Custom animated cursor (ring, crosshair, corner brackets, dot) via `@cursorify/react`
- Restricted-access login modal with client-side credential validation
- Authenticated desktop route guarded by an auth context
- Taskbar with an Arch Linux-style start button, app area, and live clock/date
- Start menu dialog with logout
- Zoom and multi-touch zoom prevention
- DevTools and right-click context menu disabled
- Linux AppImage build via `electron-builder`

## Tech stack

- [Vite](https://vite.dev/) 8 + [React](https://react.dev/) 19 + TypeScript
- [Electron](https://www.electronjs.org/) 45
- [react-router-dom](https://reactrouter.com/) 7
- [react-icons](https://react-icons.github.io/react-icons/)
- [@cursorify/react](https://www.npmjs.com/package/@cursorify/react)
- [ky](https://github.com/sindresorhus/ky)
- [pnpm](https://pnpm.io/) (package manager)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) LTS (>= 20)
- [pnpm](https://pnpm.io/installation)
- [Git](https://git-scm.com/downloads)

### Install

```bash
git clone https://github.com/tizianoluziramos/nsa-electron.git
cd nsa-electron
pnpm install
```

## Run locally

### Web (Vite dev server)

```bash
pnpm dev
```

Opens the Vite dev server with React Fast Refresh.

### Desktop (Electron)

Build the web assets first, then launch Electron:

```bash
pnpm build
pnpm desktop
```

The Electron window loads the built app from `dist/` using the custom `app://` protocol in fullscreen.

## Build

### Web build

```bash
pnpm build
```

Runs `tsc -b` followed by `vite build`, outputting to `dist/`.

### Linux AppImage

```bash
pnpm build:linux
```

Produces `dist/NSA Desktop-*.AppImage` via `electron-builder`.

## Authentication

Authentication is handled client-side against `src/data/users.json`. The default credentials are:

| Username | Password |
| --- | --- |
| `admin` | `admin` |
| `user` | `password` |

On a successful login, a token is generated (SHA-256 of the username and timestamp) and stored in `localStorage`. Only the token is persisted; no user or role payload is stored. Logging out removes the token and redirects to the login screen.

> [!NOTE]
> Credentials are validated locally against `src/data/users.json`.

## Project structure

```text
nsa-electron/
├── electron.cjs            # Electron main process
├── preload.cjs             # Preload bridge (window.system)
├── index.html              # Vite entry HTML (mounts #app)
├── vite.config.ts
├── src/
│   ├── App.tsx             # Root component, routes and providers
│   ├── main.tsx            # React entry point
│   ├── components/         # UI components
│   ├── context/            # Auth context
│   ├── hooks/              # useAuth hook
│   ├── layouts/            # Layout with background
│   ├── pages/              # Home and Login pages
│   ├── routes/             # Route guards
│   ├── services/           # Auth service
│   ├── styles/             # CSS Modules
│   ├── types/              # TypeScript types
│   ├── utils/              # preventZoom
│   └── data/               # users.json
├── public/                 # Static assets (favicon, background)
└── .github/workflows/      # CI (Linux AppImage build)
```

## Continuous integration

The `Build Linux AppImage` workflow (`.github/workflows/build-linux.yml`) runs on pushes to `main`, tags `v*`, and pull requests to `main`. It installs dependencies with pnpm, builds the app, builds the Linux AppImage, and uploads it as an artifact. Tagged releases (`v*`) also create a GitHub release with the AppImage attached.