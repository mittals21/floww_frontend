import { Navigate, Outlet } from "react-router-dom"
import useAuthStore from "../store/auth.store"
import Loading from "../components/Loading"

export default function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuthStore()

  if (isInitializing) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
