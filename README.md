# ✅ Library Management Frontend

This is the frontend application for the Library Management System (SmartShelf). It is built with React, TypeScript, Redux, and RTK Query to interact with the backend API. The design uses Tailwind CSS and Shadcn UI components for a clean and modern look.

---

## Features

- **View all books**  
  Browse the list of all books with options to view details, edit, delete, or borrow a book.

- **Add a new book**  
  Fill a form to create and add a new book to the library.

- **View book details**  
  See detailed information about a specific book.

- **Edit a book**  
  Update existing book information through a form.

- **Borrow a book**  
  Borrow a selected book using a simple form.

- **Borrow summary**  
  View a summary that shows aggregated information about all borrowed books.

---

## Pages

- `/` — List all books with actions (view, edit, delete, borrow)  
- `/create-book` — Form to add a new book  
- `/books/:id` — Detailed view of one book  
- `/edit-book/:id` — Form to update book details  
- `/borrow/:bookId` — Form to borrow a selected book  
- `/borrow-summary` — Summary of borrowed books using aggregation  

---

## Frontend Tech Stack

- React  
- TypeScript  
- Redux & RTK Query (for state and API calls)  
- Tailwind and Shadcn UI (for UI components)  

---

## How to run locally

1. Clone the repository  
2. Install dependencies with `npm install`
3. Run the app with `npm start` or `npm run dev` 
4. Make sure your backend server is running.
5. Access the frontend via localhost in your web browser
---

## Notes

- The frontend communicates with the backend API endpoints to manage books and borrow records.  
- Make sure the backend API URLs are correctly configured in the app (e.g., in an environment variable).  
- The UI components follow a clean and responsive design with Shadcn.  

---

*Thanks*