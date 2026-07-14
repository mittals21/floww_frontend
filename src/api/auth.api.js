import apiClient from "./client"
import { authUrls } from "./urls"

export async function register(data) {
  const res = await apiClient.post(authUrls.register, data)

  return res.data
}

export async function login(data) {
  const res = await apiClient.post(authUrls.login, data)

  return res.data
}

export async function logout() {
  const res = await apiClient.post(authUrls.logout)

  return res.data
}

export async function getMe() {
  const res = await apiClient.get(authUrls.me)

  return res.data
}
