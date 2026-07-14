import { create } from "zustand"
import * as authApi from "../api/auth.api"

const useAuthStore = create((set) => ({
  user: null,
  isInitializing: true,
  isAuthenticated: false,
  isLoading: false,

  login: async (credentials) => {
    set({ isLoading: true })

    try {
      const { user } = await authApi.login(credentials)

      set({
        user,
        isAuthenticated: true,
      })

      return user
    } finally {
      set({ isLoading: false })
    }
  },

  register: async (data) => {
    set({ isLoading: true })

    try {
      return await authApi.register(data)
    } finally {
      set({ isLoading: false })
    }
  },

  logout: async () => {
    set({ isLoading: true })

    try {
      await authApi.logout()

      set({
        user: null,
        isAuthenticated: false,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  getMe: async () => {
    try {
      const { user } = await authApi.getMe()

      set({
        user,
        isAuthenticated: true,
      })
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      })
    } finally {
      set({
        isInitializing: false,
      })
    }
  },
}))

export default useAuthStore
