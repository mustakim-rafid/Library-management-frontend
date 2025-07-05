import { Link } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import WebsiteLogo from "@/assets/websiteLogo.svg"

const Navbar = () => {

  return (
    <>
    <div className="flex justify-between items-center px-20 p-3">
        <img className="text-blue-300" src={WebsiteLogo} height={40} width={40} alt="websitelogo" />
        <ul className="flex gap-14"> 
            <li className="dark:hover:text-gray-300 hover:text-gray-700"><Link to={"/"}>All Books</Link></li>
            <li className="dark:hover:text-gray-300 hover:text-gray-700"><Link to={"/create-book"}>Add Book</Link></li>
            <li className="dark:hover:text-gray-300 hover:text-gray-700"><Link to={"/borrow-summary"}>Borrow Summary</Link></li>
        </ul>
        <ModeToggle />
    </div>
    <div className="w-screen h-[1.5px] dark:bg-gray-800 bg-gray-200"></div>
    </>
  )
}

export default Navbar