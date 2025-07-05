import App from "@/App";
import AllBooks from "@/pages/AllBooks";
import BorrowBook from "@/pages/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary";
import CreateBook from "@/pages/CreateBook";
import EditBook from "@/pages/EditBook";
import BookCard from "@/pages/BookCard";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: AllBooks
            },
            {
                path: "/borrow-summary",
                Component: BorrowSummary
            },
            {
                path: "/create-book",
                Component: CreateBook
            },
            {
                path: "/edit-book/:id",
                Component: EditBook
            },
            {
                path: "/borrow/:bookId",
                Component: BorrowBook
            },
            {
                path: "/books/:id",
                Component: BookCard
            }
        ]
    }
])