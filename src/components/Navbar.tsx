import { Link } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import WebsiteLogo from "@/assets/websiteLogo.svg"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AlignRight } from "lucide-react"

const Navbar = () => {

  return (
    <>
    <div className="flex justify-between items-center px-8 md:px-20 p-3">
        <img className="text-blue-300" src={WebsiteLogo} height={40} width={40} alt="websitelogo" />
        <div className="md:flex hidden gap-10 items-center">
          <ul className="flex gap-10"> 
              <li className="dark:hover:text-gray-300 hover:text-gray-700"><Link to={"/"}>All Books</Link></li>
              <li className="dark:hover:text-gray-300 hover:text-gray-700"><Link to={"/create-book"}>Add Book</Link></li>
              <li className="dark:hover:text-gray-300 hover:text-gray-700"><Link to={"/borrow-summary"}>Borrow Summary</Link></li>
          </ul>
          <ModeToggle />
        </div>
        <div className="md:hidden">
          <Sheet>
          <SheetTrigger>
            <AlignRight className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <div className="flex flex-col gap-10 items-center mt-10">
                  <ul className="flex flex-col gap-10"> 
                    <li className="dark:hover:text-gray-300 hover:text-gray-700"><Link to={"/"}>All Books</Link></li>
                    <li className="dark:hover:text-gray-300 hover:text-gray-700"><Link to={"/create-book"}>Add Book</Link></li>
                    <li className="dark:hover:text-gray-300 hover:text-gray-700"><Link to={"/borrow-summary"}>Borrow Summary</Link></li>
                  </ul>
                  <ModeToggle />
                </div>
              </SheetTitle>
              <SheetDescription className="absolute bottom-5">
                SmartShelf | Library Management App
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        </div>
    </div>
    <div className="w-screen h-[1.5px] dark:bg-gray-800 bg-gray-200"></div>
    </>
  )
}

export default Navbar