export const authUrls = {
  register: "/auth/register",
  login: "/auth/login",
  logout: "/auth/logout",
  me: "/auth/me",
}

export const workflowUrls = {
  getAll: "/workflows",
  getOne: (workflowId) => `/workflows/${workflowId}`,
  create: "/workflows",
  update: "/workflows",
  delete: (workflowId) => `/workflows/${workflowId}`,
}
