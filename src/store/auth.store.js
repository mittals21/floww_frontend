import { create } from "zustand"

export const useAuthStore = create((set, get) => ({
  // State
  user: null,
  isAuthenticated: false,
  isLoading: false,

  // Auth Actions
  login: async () => {},

  register: async () => {},

  logout: async () => {},

  getCurrentUser: async () => {},
}))
