import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/auth.store"
import { useWorkflowStore } from "../store/workflow.store"

const Dashboard = () => {
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const workflows = useWorkflowStore((state) => state.workflows)
  const isLoading = useWorkflowStore((state) => state.isLoading)
  const getAllWorkflows = useWorkflowStore((state) => state.getAllWorkflows)
  const createWorkflow = useWorkflowStore((state) => state.createWorkflow)

  useEffect(() => {
    getAllWorkflows()
  }, [])

  const handleCreateWorkflow = async () => {
    try {
      const workflowId = await createWorkflow()
      navigate(`/workflows/${workflowId}`)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-background-dark text-text-dark">
      <div className="mx-auto max-w-6xl p-8">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary-500">Floww</h1>

            <p className="mt-2 text-text-dark-secondary">
              Welcome back, {user?.name}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCreateWorkflow}
              className="rounded-lg bg-primary-600 px-5 py-2.5 font-medium text-white transition hover:bg-primary-700"
            >
              + New Workflow
            </button>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-border-dark px-5 py-2.5 hover:bg-surface-dark-secondary"
            >
              Logout
            </button>
          </div>
        </header>

        {isLoading ? (
          <p className="text-text-dark-secondary">Loading workflows...</p>
        ) : workflows.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border-dark py-20 text-center">
            <h2 className="text-xl font-semibold">No workflows yet</h2>

            <p className="mt-2 text-text-dark-secondary">
              Create your first workflow to get started.
            </p>

            <button
              onClick={handleCreateWorkflow}
              className="mt-6 rounded-lg bg-primary-600 px-5 py-2.5 font-medium text-white hover:bg-primary-700"
            >
              Create Workflow
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workflows.map((workflow) => (
              <button
                key={workflow.id}
                onClick={() => navigate(`/workflows/${workflow.id}`)}
                className="rounded-xl border border-border-dark bg-surface-dark p-5 text-left transition hover:border-primary-500 hover:bg-surface-dark-secondary hover:-translate-y-0.5 duration-200"
              >
                <h3 className="text-lg font-semibold">{workflow.name}</h3>

                <p className="mt-2 line-clamp-2 text-sm text-text-dark-secondary">
                  {workflow.description || "No description"}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
