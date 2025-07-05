import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Toaster } from "./components/ui/sonner"
import Footer from "./components/Footer"

function App() {

  return (
    <>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  )
}

export default App
