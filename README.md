<p align="center"><h1 align="center">GRAPHQL-CHAT</h1></p>
<p align="center">
	<img src="https://img.shields.io/github/license/unk-pn/graphql-chat?style=default&amp;logo=opensourceinitiative&amp;logoColor=white&amp;color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/unk-pn/graphql-chat?style=default&amp;logo=git&amp;logoColor=white&amp;color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/unk-pn/graphql-chat?style=default&amp;color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/unk-pn/graphql-chat?style=default&amp;color=0080ff" alt="repo-language-count">
</p>

## 🧠 Overview

The **Real-Time Chat Application** is a full-stack project that enables users to engage in real-time conversations with each other. The application features a backend built with Apollo Server, Prisma, and PostgreSQL, and a frontend built with Next.js and React. The project showcases a seamless integration of GraphQL, WebSocket, and authentication technologies to provide a scalable and efficient real-time chat experience.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Using Docker (Recommended)](#-using-docker-recommended)
  - [Running Locally](#-running-locally)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

- **Real-time messaging** with WebSocket support
- **User authentication** and authorization using JSON Web Tokens (JWT)
- **GraphQL API** for querying and mutating data
- **Prisma ORM** for database management
- **Next.js and React** for building fast frontend
- Support for multiple chat rooms and user management
- **Containerized Environment** using Docker and Docker Compose for easy deployment

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Apollo Client
- **Backend:** Apollo Server, Prisma, PostgreSQL, Node.js
- **Authentication:** JSON Web Tokens (JWT)
- **WebSocket:** graphql-ws
- **Infrastructure:** Docker, Docker Compose

## 📂 Project Structure

```sh
└── graphql-chat/
    ├── client
    │   ├── Dockerfile
    │   ├── next.config.ts
    │   ├── package.json
    │   ├── public
    │   ├── src
    │   └── tsconfig.json
    ├── server
    │   ├── Dockerfile
    │   ├── package.json
    │   ├── prisma
    │   ├── prisma.config.ts
    │   ├── src
    │   └── tsconfig.json
    └── docker-compose.yaml
```

## 📦 Getting Started

### Prerequisites

Before getting started, ensure your environment meets the following requirements:

- **Docker &amp; Docker Compose** (Recommended route)
- **Node.js &amp; npm** (If running locally without Docker)
- **PostgreSQL** (If running locally)

### Environment Variables

Before running the application (either via Docker or locally), you need to configure the environment variables.

#### 1. Root `.env` (For Docker Compose)

Create a `.env` file in the root directory:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=graphql_chat
POSTGRES_PORT=5432

JWT_SECRET=super_secret_jwt_key_123

NEXT_PUBLIC_GRAPHQL_HTTP_URL=http://localhost:4000/graphql
NEXT_PUBLIC_GRAPHQL_WS_URL=ws://localhost:4000/graphql
```

#### 2. Server `.env` (For running locally without Docker)

Create a `.env` file in the `/server` directory:

```env
JWT_SECRET=super_secret_jwt_key_123
# Update with your local PostgreSQL credentials
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/graphql_chat?schema=public"
```

#### 3. Client `.env` (For running locally without Docker)

Create a `.env.local` or `.env` file in the `/client` directory:

```env
NEXT_PUBLIC_GRAPHQL_HTTP_URL=http://localhost:4000/graphql
NEXT_PUBLIC_GRAPHQL_WS_URL=ws://localhost:4000/graphql
```

### Installation &amp; Usage

**🐳 Using Docker (Recommended)**

The project is fully containerized. You can run the entire stack (Database, Backend, Frontend) concurrently with a single command:

```sh
❯ docker-compose up --build -d
```

_Wait a few seconds for all services to start. The client will be available at `http://localhost:3000`._

**💻 Running Locally (Without Docker)**

1. **Clone the repository:**

```sh
❯ git clone https://github.com/unk-pn/graphql-chat.git
❯ cd graphql-chat
```

2. **Install dependencies:**

```sh
❯ cd server && npm install
❯ cd ../client && npm install
```

3. **Set up the database** (Ensure your local PostgreSQL is running):

```sh
❯ cd server
❯ npx prisma migrate dev --name init
❯ npm run start
```

4. **Start the client:**

```sh
❯ cd ../client
❯ npm run dev
```

## 💻 Usage

1. Open a browser window and navigate to `http://localhost:3000`
2. Create an account and log in to the application
3. Join a chat room or create a new one
4. Start chatting with other users in real-time

## 📝 License

This project is protected under the [MIT License](https://choosealicense.com/licenses/mit/)

## 💖 Acknowledgments

Special thanks to [Roman](https://github.com/Ex1s9) for providing most of the frontend part
