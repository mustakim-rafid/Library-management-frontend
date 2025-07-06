import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetBookByIdQuery } from "@/store/features/book/bookApi"
import { useParams } from "react-router-dom"

function BookCard() {
  const { id } = useParams()
  const { data: bookDetails, isLoading } = useGetBookByIdQuery(id)

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-3/4 rounded" /> 
          <Skeleton className="h-4 w-1/2 rounded" /> 
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-2/3 rounded" /> 
          <Skeleton className="h-4 w-1/3 rounded" /> 
          <Skeleton className="h-4 w-1/2 rounded" /> 
          <Skeleton className="h-4 w-1/4 rounded" />
        </CardContent>
      </Card>
      </div>
    )
  }

  return (
    <div className="flex justify-center mt-10"> 
      <Card className="w-full max-w-lg mx-2">
        <CardHeader>
          <CardTitle className="text-xl">Book Title: {bookDetails.data.title}</CardTitle>
          <CardDescription>Author: {bookDetails.data.author}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <p><span className="font-semibold">Genre:</span> {bookDetails.data.genre}</p>
            <p><span className="font-semibold">ISBN:</span> {bookDetails.data.isbn}</p>
            <p><span className="font-semibold">Description:</span> {bookDetails.data.description}</p>
            <p><span className="font-semibold">Quantity Available:</span> {bookDetails.data.copies}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookCard


