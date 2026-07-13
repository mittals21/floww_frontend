import { SubmitButton } from "./components/SubmitButton"
import { PipelineCanvas } from "./components/workflow/PipelineCanvas"
import { PipelineToolbar } from "./components/workflow/PipelineToolbar"

function App() {
  return (
    <>
      <PipelineToolbar />
      <PipelineCanvas />
      <SubmitButton />
    </>
  )
}

export default App
