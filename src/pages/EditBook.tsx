import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useGetBookByIdQuery, useUpdateBookMutation } from "@/store/features/book/bookApi"
import { toast } from "sonner"
import { useNavigate, useParams } from "react-router-dom"
import { formSchema } from "./CreateBook"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

const EditBook = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { id } = useParams()
  const {data: book, isLoading} = useGetBookByIdQuery(id)
  const [updateBook] = useUpdateBookMutation()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: ""
    }
  })

  useEffect(() => {
    if (book?.data) {
        form.reset({
            title: book.data.title,
            author: book.data.author,
            genre: book.data.genre,
            isbn: book.data.isbn,
            description: book.data.description,
            copies: book.data.copies.toString()
        })
    }
  }, [book])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    const bookInfo = {
      ...values,
      copies: parseInt(values.copies),
      available: parseInt(values.copies) === 0 ? false : true
    }
    try {
      const response = await updateBook({id, ...bookInfo}).unwrap()
      toast(response.message)
      navigate("/")
    } catch (error: any) {
      console.error("Error: ", error.data.message)
      toast(error.data.message, {
        style: {
          background: 'red'
        }
      })
    } finally {
      form.reset()
      setIsSubmitting(false)
    }
  }
  
  if (isLoading) {
    return (
        <>
        <div className="">
        <h1 className="text-2xl text-center py-3 pt-5 font-semibold">Update Book</h1>
        </div>
        <div className="flex flex-col space-y-4 mx-14">
          <Skeleton className="h-6 w-[200px] rounded" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-[120px] rounded-md" />
        </div>
        </>
    )
  }

  return (
    <div className="md:mx-20 mx-3">
    <div>
      <h1 className="text-2xl text-center py-3 pt-5 font-semibold">Update Book</h1>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="author"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="author" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="genre"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a genre to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FICTION">Fiction</SelectItem>
                  <SelectItem value="NON_FICTION">Non-fiction</SelectItem>
                  <SelectItem value="SCIENCE">Science</SelectItem>
                  <SelectItem value="HISTORY">History</SelectItem>
                  <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                  <SelectItem value="FANTASY">Fantasy</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="description of this book"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="copies"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Copies</FormLabel>
              <FormControl>
                <Input className="w-20" placeholder="copies" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="cursor-pointer" type="submit">
          {
            isSubmitting ? <>
              <Loader2 className="animate-spin" />
            </> : "Save Changes"
          }
        </Button>
      </form>
    </Form>
    </div>
  )
}

export default EditBook