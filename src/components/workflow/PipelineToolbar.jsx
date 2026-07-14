import { Link, useNavigate } from "react-router-dom"
import { DraggableNode } from "../DraggableNode"
import { useWorkflowStore } from "../../store/workflow.store"

const NODE_TYPES = [
  {
    type: "customInput",
    label: "Input",
  },
  {
    type: "llm",
    label: "LLM",
  },
  {
    type: "customOutput",
    label: "Output",
  },
  {
    type: "text",
    label: "Text",
  },
]

const PipelineToolbar = () => {
  const navigate = useNavigate()

  const workflow = useWorkflowStore((state) => state.selectedWorkflow)
  const nodes = useWorkflowStore((state) => state.nodes)
  const edges = useWorkflowStore((state) => state.edges)

  const setWorkflowData = useWorkflowStore((state) => state.setWorkflowData)

  const updateWorkflow = useWorkflowStore((state) => state.updateWorkflow)

  const deleteWorkflow = useWorkflowStore((state) => state.deleteWorkflow)

  const handleSave = async () => {
    if (!workflow) return

    await updateWorkflow(workflow.id, {
      name: workflow.name,
      description: workflow.description,
      nodes,
      edges,
    })
  }

  const handleDelete = async () => {
    if (!workflow) return

    await deleteWorkflow(workflow.id)

    navigate("/")
  }

  return (
    <div className="border-b border-border-dark bg-surface-dark">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm text-text-dark-secondary hover:text-white"
          >
            ← Dashboard
          </Link>

          <input
            value={workflow?.name ?? ""}
            onChange={(e) =>
              setWorkflowData({
                name: e.target.value,
              })
            }
            placeholder="Untitled Workflow"
            className="w-72 rounded-lg border border-border-dark bg-background-dark-secondary px-4 py-2 outline-none focus:border-primary-500 text-neutral-100"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
          >
            Save
          </button>

          <button
            onClick={handleDelete}
            className="rounded-lg border border-danger-600 px-4 py-2 text-danger-500 hover:bg-danger-600/10"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex gap-3 border-t border-border-dark px-6 py-4">
        {NODE_TYPES.map((node) => (
          <DraggableNode key={node.type} type={node.type} label={node.label} />
        ))}
      </div>
    </div>
  )
}

export default PipelineToolbar
