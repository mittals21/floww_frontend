import { Navigate, Outlet } from "react-router-dom"
import useAuthStore from "../store/auth.store"
import Loading from "../components/Loading"

export default function PublicRoute() {
  const { isAuthenticated, isInitializing } = useAuthStore()

  if (isInitializing) {
    return <Loading />
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
