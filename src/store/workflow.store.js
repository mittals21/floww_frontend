import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
} from "@xyflow/react"
import { create } from "zustand"
import { buildNodeIDs } from "../utils/getNodeId"
import { toast } from "sonner"
import apiClient from "../api/client"
import { workflowUrls } from "../api/urls"

export const useWorkflowStore = create((set, get) => ({
  workflows: [],
  selectedWorkflow: null,
  isLoading: false,

  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs }

    if (newIDs[type] === undefined) {
      newIDs[type] = 0
    }

    newIDs[type] += 1

    set({ nodeIDs: newIDs })

    return `${type}-${newIDs[type]}`
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    })
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    })
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow,
            height: "20px",
            width: "20px",
          },
        },
        get().edges,
      ),
    })
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...(node.data ?? {}),
                [fieldName]: fieldValue,
              },
            }
          : node,
      ),
    }))
  },

  setWorkflowData: (data) => {
    set((state) => ({
      selectedWorkflow: {
        ...state.selectedWorkflow,
        ...data,
      },
    }))
  },

  // -------------------------
  // API Actions
  // -------------------------

  getAllWorkflows: async (params = {}) => {
    set({ isLoading: true })

    try {
      const res = await apiClient.get(workflowUrls.getAll, {
        params,
      })

      set({
        workflows: res.data.workflows,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  getWorkflow: async (id) => {
    set({ isLoading: true })

    try {
      const {
        data: { workflow },
      } = await apiClient.get(workflowUrls.getSingle(id))

      set({
        selectedWorkflow: workflow,
        nodes: workflow.nodes,
        edges: workflow.edges,
        nodeIDs: buildNodeIDs(workflow.nodes),
      })

      return workflow
    } finally {
      set({ isLoading: false })
    }
  },

  createWorkflow: async () => {
    const {
      data: { workflowId, message },
    } = await apiClient.post(workflowUrls.create, {
      name: "Untitled Workflow",
      description: "",
      nodes: [],
      edges: [],
    })

    await get().getAllWorkflows()
    toast.success(message)

    return workflowId
  },

  updateWorkflow: async (data) => {
    const {
      data: { message },
    } = await apiClient.post(workflowUrls.update, data)

    toast.success(message)

    set((state) => ({
      selectedWorkflow:
        state.selectedWorkflow?.id === data.id
          ? {
              ...state.selectedWorkflow,
              ...data,
            }
          : state.selectedWorkflow,
    }))
  },

  deleteWorkflow: async (id) => {
    const {
      data: { message },
    } = await apiClient.delete(workflowUrls.delete(id))

    toast.success(message)

    set((state) => ({
      workflows: state.workflows.filter((workflow) => workflow.id !== id),
    }))
  },
}))
