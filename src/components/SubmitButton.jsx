import axios from "axios"
import { useWorkflowStore } from "../store/workflow.store"

export const SubmitButton = () => {
  const nodes = useWorkflowStore((state) => state.nodes)
  const edges = useWorkflowStore((state) => state.edges)

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/pipelines/parse",
        {
          nodes,
          edges,
        },
      )

      console.log("Backend Response:", data)
    } catch (error) {
      console.error("Error submitting pipeline:", error)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
