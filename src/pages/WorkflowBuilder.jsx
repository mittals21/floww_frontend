import { useEffect } from "react"
import { useParams } from "react-router-dom"
import PipelineCanvas from "../components/workflow/PipelineCanvas"
import PipelineToolbar from "../components/workflow/PipelineToolbar"
import WorkflowHeader from "../components/workflow/WorkflowHeader"

import { useWorkflowStore } from "../store/workflow.store"
import ExecutionPanel from "../components/workflow/ExecutionPanel"

const WorkflowBuilder = () => {
  const { id } = useParams()

  const getWorkflow = useWorkflowStore((state) => state.getWorkflow)

  useEffect(() => {
    if (id) {
      getWorkflow(id)
    }
  }, [id])

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <PipelineToolbar />

      <div className="flex flex-1 flex-col">
        <WorkflowHeader />

        <div className="flex-1">
          <PipelineCanvas />
        </div>

        <ExecutionPanel />
      </div>
    </div>
  )
}

export default WorkflowBuilder
