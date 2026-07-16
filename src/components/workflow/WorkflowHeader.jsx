import { Link, useNavigate, useParams } from "react-router-dom"
import { useWorkflowStore } from "../../store/workflow.store"

const WorkflowHeader = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const workflow = useWorkflowStore((state) => state.selectedWorkflow)
  const nodes = useWorkflowStore((state) => state.nodes)
  const edges = useWorkflowStore((state) => state.edges)

  const setWorkflowData = useWorkflowStore((state) => state.setWorkflowData)
  const updateWorkflow = useWorkflowStore((state) => state.updateWorkflow)
  const deleteWorkflow = useWorkflowStore((state) => state.deleteWorkflow)
  const runWorkflow = useWorkflowStore((state) => state.runWorkflow)
  const isExecuting = useWorkflowStore((state) => state.isExecuting)

  const handleSave = async () => {
    if (!workflow) return

    await updateWorkflow({
      workflowId: id,
      name: workflow.name,
      description: workflow.description,
      nodes,
      edges,
    })
  }

  const handleRun = async () => {
    await runWorkflow(id)
  }

  const handleDelete = async () => {
    if (!workflow) return

    await deleteWorkflow(workflow.id)

    navigate("/")
  }

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-800 bg-gray-900 px-6">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <input
            value={workflow?.name ?? ""}
            onChange={(e) =>
              setWorkflowData({
                name: e.target.value,
              })
            }
            placeholder="Untitled Workflow"
            className="w-80 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm outline-none transition focus:border-primary-500"
          />

          <input
            value={workflow?.description ?? ""}
            onChange={(e) =>
              setWorkflowData({
                description: e.target.value,
              })
            }
            placeholder="Add a description..."
            className="w-80 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-xs text-gray-300 outline-none transition focus:border-primary-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="rounded-lg border border-gray-700 px-4 py-2 text-sm transition hover:border-primary-500"
        >
          Save
        </button>

        <button
          disabled={isExecuting}
          onClick={handleRun}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isExecuting ? "Running..." : "▶ Run"}
        </button>

        <button
          onClick={handleDelete}
          className="rounded-lg border border-danger-600 px-4 py-2 text-sm text-danger-500 transition hover:border-primary-500"
        >
          Delete
        </button>
      </div>
    </header>
  )
}

export default WorkflowHeader
