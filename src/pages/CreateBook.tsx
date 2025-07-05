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
import { useCreateBookMutation } from "@/store/features/book/bookApi"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Loader2 } from "lucide-react"
 
export const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(50),
  author: z.string().min(1, "Author is required"),
  genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY", ""]),
  isbn: z.string().min(1, "ISBN is required"),
  description: z.string(),
  copies: z.string()
})

const CreateBook = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [createBook] = useCreateBookMutation()
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    const bookInfo = {
      ...values,
      copies: parseInt(values.copies),
      available: parseInt(values.copies) === 0 ? false : true
    }
    try {
      const response = await createBook(bookInfo).unwrap()
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

  return (
    <div className="mx-20">
    <div>
      <h1 className="text-2xl text-center py-3 pt-5 font-semibold">Add New Book</h1>
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
          name="isbn"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input placeholder="isbn" {...field} />
              </FormControl>
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
            </> : "Submit"
          }
        </Button>
      </form>
    </Form>
    </div>
  )
}

export default CreateBook