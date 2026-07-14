import React, { useEffect } from "react"
import PipelineToolbar from "../components/workflow/PipelineToolbar"
import PipelineCanvas from "../components/workflow/PipelineCanvas"
import SubmitButton from "../components/SubmitButton"
import { useParams } from "react-router-dom"
import { useWorkflowStore } from "../store/workflow.store"

const WorkflowBuilder = () => {
  const { id } = useParams()

  const getWorkflow = useWorkflowStore((state) => state.getWorkflow)

  useEffect(() => {
    if (id) {
      getWorkflow(id)
    }
  }, [id])

  return (
    <div>
      <PipelineToolbar />
      <PipelineCanvas />
    </div>
  )
}

export default WorkflowBuilder
