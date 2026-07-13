import apiClient from "./client"
import { authUrls } from "./urls"

export async function register(data) {
  const response = await apiClient.post(authUrls.register, data)

  return response.data
}

export async function login(data) {
  const response = await apiClient.post(authUrls.login, data)

  return response.data
}

export async function logout() {
  const response = await apiClient.post(authUrls.logout)

  return response.data
}

export async function getMe() {
  const response = await apiClient.get(authUrls.me)

  return response.data
}
