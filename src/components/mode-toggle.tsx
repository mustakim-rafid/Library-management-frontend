import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/providers/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex justify-center">
      <div>
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
      </div>
    </div>
  )
}