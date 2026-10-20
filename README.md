# AMSEPS Imageboard

A full-stack, real-time imageboard application built from scratch using modern web technologies.

## Technical Highlights

This project demonstrates several notable engineering accomplishments:

- **Full-Stack JavaScript Architecture** — Unified codebase with React frontend and Node.js/Express backend, enabling seamless data flow and shared type definitions
- **Real-Time Threaded Discussions** — Custom-built threading system with nested replies, reply linking, and dynamic content updates without page reloads
- **Efficient Image Pipeline** — Client-side image handling with lazy loading, automatic thumbnail generation, and optimized delivery for bandwidth efficiency
- **MongoDB Document Storage** — Flexible NoSQL schema design optimized for hierarchical thread/reply relationships and rapid catalog queries
- **Markdown Rendering Engine** — Built-in markup support for rich text formatting in posts and replies
- **Responsive SPA Design** — Single-page application architecture with dynamic grid layouts and floating reply widgets for modern UX

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (includes npm)
- [Git](https://git-scm.com/downloads)

Verify installation:

```bash
git --version
node --version
npm --version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/amseps/amseps-imageboard
cd amseps-imageboard
```

Install dependencies for both frontend and backend:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../amseps
npm install
```

## Running the Application

Start the backend server (from the `backend` directory):

```bash
nodemon server
```

In a separate terminal, start the frontend (from the `amseps` directory):

```bash
npm start
```

The application will open in your browser automatically.

> **Note:** Ensure you are connecting to the development database, not production, when running locally.

## Project Structure

```
amseps-imageboard/
├── amseps/          # React frontend application
├── backend/         # Node.js/Express API server
├── LICENSE
└── README.md
```

## Roadmap

### Completed

- Core CRUD operations for threads and replies
- Image uploads with lazy loading and thumbnails
- Threaded reply system with reply numbering
- Markdown formatting support
- Dynamic catalog grid layout
- Floating reply widget with reply preview
- Loading states and error handling
- Static pages (Home)

### In Progress

- Admin controls (thread management)
- CAPTCHA integration for spam prevention
- Enhanced input validation
- Thread archiving system
- Custom error pages

### Planned

- Real-time viewer counts
- Search functionality
- Dark mode
- Voting/reaction system
- User notifications
- Multiple boards support

## License

See [LICENSE](LICENSE) for details.