import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useBorrowedBooksSummaryQuery } from "@/store/features/book/bookApi"

const BorrowSummary = () => {
  const { data: borrowSummaryResponse, isLoading } = useBorrowedBooksSummaryQuery(undefined)

  if (isLoading) {
        return (
        <>
            <div className="flex justify-center py-5">
                <h1 className="text-3xl flex justify-center">Borrow Summary</h1>
            </div>
            <div className="space-y-3 md:mx-40 mx-5">
            <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-6 rounded-sm w-full" />
                <Skeleton className="h-6 rounded-sm w-full" />
                <Skeleton className="h-6 rounded-sm w-full" />
            </div>
            {[...Array(15)].map((_, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-4 rounded-sm w-full" />
                    <Skeleton className="h-4 rounded-sm w-full" />
                    <Skeleton className="h-4 rounded-sm w-full" />
                </div>
            ))}
            </div>
        </>
        )
    }

  return (
    <div>
      <div className="flex justify-center py-5">
        <h1 className="text-3xl flex justify-center">Borrow Summary</h1>
      </div>
      <div className="md:mx-40 mx-2">
      <Table >
            <TableCaption>List of Borrowed Books and Quantities</TableCaption>
            <TableHeader>
              <TableRow className="text-lg">
                <TableHead>Title</TableHead>
                <TableHead className="w-[500px]">ISBN</TableHead>
                <TableHead className="w-[200px]">Total quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                borrowSummaryResponse.data.map((borrowedBook: any) => (
                  borrowedBook.book.title && borrowedBook.book.isbn && <TableRow key={borrowedBook.book.isbn}>
                    <TableCell>{borrowedBook.book.title}</TableCell>
                    <TableCell>{borrowedBook.book.isbn}</TableCell>
                    <TableCell>{borrowedBook.totalQuantity}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
      </div>
    </div>
  )
}

export default BorrowSummary