# Server — notes-app

A lightweight Express server for the Notes App. This README explains how to set up, run, and use the server located in the `server` folder.

**Prerequisites**
- Node.js (v16+ recommended)
- npm or yarn
- If using a database: MongoDB (remote or local)

**Install**
1. Open a terminal in the `server` folder.
2. Install dependencies:

```bash
npm install
```

**Environment variables**
Create a `.env` file in the `server` folder (if required) and set:

- `PORT` (optional) — port the server will listen on, default 5000
- `MONGO_URI` — MongoDB connection string (if using MongoDB)

**Available scripts**
- `npm start` — run the server with Node
- `npm run dev` — run the server with nodemon for auto-reload during development

**Run the server**

1. Open a terminal in the `server` folder.
2. Install dependencies if you have not already:

```bash
npm install
```

3. Start the server:

```bash
# development mode (auto restart on changes)
npm run dev

# production mode
npm start
```

4. Visit the server homepage to verify it is running:

```bash
http://localhost:5000/
```

If you want to run without npm scripts, use:

```bash
node server.js
```

**API Endpoints (core)**
These are implemented under the API router (see routes/noteroutes.js):

- `GET /api/notes` — list all notes
- `POST /api/notes` — create a new note
- `GET /api/notes/:id` — get a single note (if implemented)
- `PUT /api/notes/:id` — update a note (if implemented)
- `DELETE /api/notes/:id` — delete a note

Adjust endpoints according to the code in [routes/noteroutes.js](routes/noteroutes.js).

**Key files**
- [server.js](server.js) — application entry point
- [package.json](package.json) — scripts and dependencies
- [routes/noteroutes.js](routes/noteroutes.js) — API route definitions
- [models/notes.js](models/notes.js) — notes data model

**Project structure**
```
server/
├─ server.js
├─ package.json
├─ routes/
│  └─ noteroutes.js
└─ models/
   └─ notes.js
```

**Notes & troubleshooting**
- If the server fails to connect to the database, verify `MONGO_URI` and network access.
- Check `package.json` scripts if `npm run dev` is not available; use `node server.js` instead.

If you want, I can also update this README with exact scripts and environment keys after inspecting `package.json` and `server.js`.
