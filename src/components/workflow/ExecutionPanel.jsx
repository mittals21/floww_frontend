import { useWorkflowStore } from "../../store/workflow.store"

const ExecutionPanel = () => {
  const executionResult = useWorkflowStore((state) => state.executionResult)
  const executionTime = useWorkflowStore((state) => state.executionTime)

  return (
    <div className="h-64 border-t border-gray-800 bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-800 px-5 py-3">
        <h2 className="font-semibold">Execution Result</h2>

        {executionTime && (
          <span className="text-sm text-gray-400">{executionTime} ms</span>
        )}
      </div>

      <div className="h-[calc(100%-53px)] overflow-y-auto p-5">
        {executionResult ? (
          <pre className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
            {executionResult}
          </pre>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Run the workflow to see the output.
          </div>
        )}
      </div>
    </div>
  )
}

export default ExecutionPanel
