import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
} from "@xyflow/react"
import { create } from "zustand"
import {
  createWorkflow,
  deleteWorkflow,
  getAllWorkflows,
  getWorkflow,
  updateWorkflow,
} from "../api/workflow.api"
import { buildNodeIDs } from "../utils/getNodeId"

export const useWorkflowStore = create((set, get) => ({
  // -------------------------
  // State
  // -------------------------

  workflows: [],
  selectedWorkflow: null,
  isLoading: false,

  nodes: [],
  edges: [],
  nodeIDs: {},

  // -------------------------
  // Canvas Actions
  // -------------------------

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
      const { workflows } = await getAllWorkflows(params)

      set({
        workflows,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  getWorkflow: async (id) => {
    set({ isLoading: true })

    try {
      const { workflow } = await getWorkflow(id)

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
    const { workflowId } = await createWorkflow({
      name: "Untitled Workflow",
      description: "",
      nodes: [],
      edges: [],
    })

    await get().getAllWorkflows()

    return workflowId
  },

  updateWorkflow: async (id, data) => {
    await updateWorkflow(id, data)

    set((state) => ({
      selectedWorkflow:
        state.selectedWorkflow?.id === id
          ? {
              ...state.selectedWorkflow,
              ...data,
            }
          : state.selectedWorkflow,
    }))
  },

  deleteWorkflow: async (id) => {
    await deleteWorkflow(id)

    set((state) => ({
      workflows: state.workflows.filter((workflow) => workflow.id !== id),
    }))
  },
}))
