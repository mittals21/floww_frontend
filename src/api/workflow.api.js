import apiClient from "./client"
import { workflowUrls } from "./urls"

export async function getAllWorkflows(params) {
  const response = await apiClient.get(workflowUrls.getAll, {
    params,
  })

  return response.data
}

export async function getWorkflow(workflowId) {
  const response = await apiClient.get(workflowUrls.getOne(workflowId))

  return response.data
}

export async function createWorkflow(data) {
  const response = await apiClient.post(workflowUrls.create, data)

  return response.data
}

export async function updateWorkflow(workflowId, data) {
  const response = await apiClient.post(workflowUrls.update, data)

  return response.data
}

export async function deleteWorkflow(workflowId) {
  const response = await apiClient.delete(workflowUrls.delete(workflowId))

  return response.data
}
