import { create } from "zustand"

const useThemeStore = create((set) => ({
  theme: "system",

  setTheme: (theme) => {
    set({ theme })

    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches

      document.documentElement.classList.toggle("dark", prefersDark)
    }
  },
}))

export default useThemeStore
