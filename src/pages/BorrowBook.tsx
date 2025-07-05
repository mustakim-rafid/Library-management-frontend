import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useParams, useNavigate } from "react-router-dom"
 
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useBorrowBookMutation } from "@/store/features/book/bookApi"
import { useState } from "react"

const formSchema = z.object({
    quantity: z.string(),
    dueDate: z.date()
})

const BorrowBook = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const { bookId } = useParams()
    const navigate = useNavigate()
    const [borrowBook] = useBorrowBookMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: "",
            dueDate: new Date()
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        const borrowInfo = {
            ...values,
            book: bookId,
            quantity: parseInt(values.quantity),
            dueDate: values.dueDate.toISOString()
        }
        try {
            const response = await borrowBook(borrowInfo).unwrap()
            toast(response.message)
            navigate("/borrow-summary")
        } catch (error: any) {
            console.log("Error: ", error.data.message)
            toast(error.data.message, {
                style: {
                    background: 'rgba(255, 35, 35, 0.8)',
                    color: "white"
                }
            })
        } finally {
            form.reset()
            setIsSubmitting(false)
        }
    }

  return (
    <div>
        <div>
            <h1 className="text-2xl text-center py-5 font-semibold">Borrow Form</h1>
        </div>
        <div className="mx-10 flex justify-center">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    name="quantity"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                            <Input className="w-60" placeholder="Enter quantity" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="dueDate"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                captionLayout="dropdown"
                            />
                            </PopoverContent>
                        </Popover>
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
    </div>
  )
}

export default BorrowBook