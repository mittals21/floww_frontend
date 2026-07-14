import { create } from "zustand"
import apiClient from "../api/client"
import { authUrls } from "../api/urls"

const useAuthStore = create((set) => ({
  user: null,
  isInitializing: true,
  isAuthenticated: false,
  isLoading: false,

  login: async (credentials) => {
    set({ isLoading: true })

    try {
      const {
        data: { user },
      } = await apiClient.post(authUrls.login, credentials)

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
      const { data: response } = await apiClient.post(authUrls.register, data)

      return response
    } finally {
      set({ isLoading: false })
    }
  },

  logout: async () => {
    set({ isLoading: true })

    try {
      await apiClient.post(authUrls.logout)

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
      const {
        data: { user },
      } = await apiClient.get(authUrls.me)

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
