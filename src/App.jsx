import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import useAuthStore from "./store/auth.store"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PublicRoute from "./pages/PublicRoute"
import ProtectedRoute from "./pages/ProtectedRoute"
import WorkflowBuilder from "./pages/WorkflowBuilder"
import Dashboard from "./pages/Dashboard"
import { Toaster } from "sonner"

const App = () => {
  const getMe = useAuthStore((state) => state.getMe)

  const isInitializing = useAuthStore((state) => state.isInitializing)

  useEffect(() => {
    getMe()
  }, [getMe])

  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-dark">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workflows/:id" element={<WorkflowBuilder />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        richColors
        theme="dark"
        position="bottom-right"
        closeButton
        duration={3000}
      />
    </>
  )
}

export default App
