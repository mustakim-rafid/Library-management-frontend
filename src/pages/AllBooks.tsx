import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useDeleteBookMutation, useGetAllBooksQuery } from "@/store/features/book/bookApi"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { BookPlus, Repeat, TextSearch, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { useState } from "react"

const AllBooks = () => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const { data: books, isLoading } = useGetAllBooksQuery(undefined)
    const [deleteBook] = useDeleteBookMutation()

    const handleDelete = async (id: string) => {
      setIsDeleting(true)
      try {
        const response = await deleteBook(id).unwrap()
        toast(response.message)
      } catch (error: any) {
        console.log("Error: ", error)
        toast(error.data.message, {
          style: {
            background: 'red'
          }
        })
      } finally {
        setIsDeleting(false)
      }
    }

    if (isLoading || isDeleting) {
        return (
        <>
            <div className="flex justify-center py-5">
                <h1 className="text-3xl flex justify-center">Book List</h1>
            </div>
            <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4">
                <Skeleton className="h-6 rounded-sm w-full" />
                <Skeleton className="h-6 rounded-sm w-full" />
                <Skeleton className="h-6 rounded-sm w-full" />
                <Skeleton className="h-6 rounded-sm w-full" />
                <Skeleton className="h-6 rounded-sm w-full" />
                <Skeleton className="h-6 rounded-sm w-full" />
            </div>
            {[...Array(15)].map((_, index) => (
                <div key={index} className="grid grid-cols-6 gap-4">
                    <Skeleton className="h-4 rounded-sm w-full" />
                    <Skeleton className="h-4 rounded-sm w-full" />
                    <Skeleton className="h-4 rounded-sm w-full" />
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
    <>
    <div className="flex justify-center py-5">
        <h1 className="text-3xl flex justify-center">Book List</h1>
    </div>
    <div className="md:mx-5 mx-2">
    <Table>
      <TableCaption>List of all books available</TableCaption>
      <TableHeader>
        <TableRow className="text-lg">
          <TableHead className="w-[250px]">Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>Copies</TableHead>
          <TableHead>Availbility</TableHead>
          <TableHead className="w-[300px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.data.map((book: any) => (
          <TableRow key={book._id}>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.genre}</TableCell>
            <TableCell>{book.copies}</TableCell>
            <TableCell>{book.available ? "Yes" : "No"}</TableCell>
            <TableCell className="space-x-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={`/edit-book/${book._id}`}><Button className="cursor-pointer" variant="outline"><Repeat /></Button></Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Update</p>
                </TooltipContent>
              </Tooltip>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="cursor-pointer" variant="outline"><Trash2 className="text-red-500" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the book details.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                      <AlertDialogAction className="cursor-pointer" onClick={() => handleDelete(book._id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={`borrow/${book._id}`} ><Button className="cursor-pointer" variant="outline"><BookPlus /></Button></Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Borrow</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={`books/${book._id}`} ><Button className="cursor-pointer" variant="outline"><TextSearch /></Button></Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Details</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    </>
  )
}

export default AllBooks