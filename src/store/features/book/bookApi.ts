import { createApi, fetchBaseQuery, type FetchArgs } from '@reduxjs/toolkit/query/react'

export const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/` }),
    tagTypes: ["book"],
    endpoints: (build) => ({
        getAllBooks: build.query({
            query: () => "books",
            providesTags: ["book"]
        }),
        createBook: build.mutation({
            query: (bookInfo) => ({
                url: "books",
                method: "POST",
                body: bookInfo
            }),
            invalidatesTags: ["book"]
        }),
        updateBook: build.mutation({
            query: ({id, ...updatedBookInfo}): FetchArgs => ({
                url: `books/${id}`,
                method: "PUT",
                body: updatedBookInfo
            }),
            invalidatesTags: ["book"]
        }),
        getBookById: build.query({
            query: (id) => `books/${id}`,
            providesTags: ["book"]
        }),
        deleteBook: build.mutation({
            query: (id) => ({
                url: `books/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["book"]
        }),
        borrowBook: build.mutation({
            query: (borrowInfo) => ({
                url: "borrow",
                method: "POST",
                body: borrowInfo
            }),
            invalidatesTags: ["book"]
        }),
        borrowedBooksSummary: build.query({
            query: () => "borrow",
            providesTags: ["book"]
        })
    })
})

export const { useGetAllBooksQuery, useCreateBookMutation, useUpdateBookMutation, useGetBookByIdQuery, useDeleteBookMutation, useBorrowBookMutation, useBorrowedBooksSummaryQuery } = bookApi