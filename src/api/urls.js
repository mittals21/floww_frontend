export const authUrls = {
  register: "/auth/register",
  login: "/auth/login",
  logout: "/auth/logout",
  me: "/auth/me",
}

export const workflowUrls = {
  getAll: "/workflow/all",
  getOne: (workflowId) => `/workflow/${workflowId}`,
  create: "/workflow/create",
  update: "/workflow/update",
  delete: (workflowId) => `/workflow/${workflowId}`,
}
