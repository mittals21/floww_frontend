import { useWorkflowStore } from "../../store/workflow.store"
import BaseNode from "./BaseNode"

export const InputNode = ({ id, data }) => {
  const updateNodeField = useWorkflowStore((state) => state.updateNodeField)

  return (
    <BaseNode
      title="Input"
      sourceHandles={[
        {
          id: `${id}-value`,
        },
      ]}
    >
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs text-text-dark-secondary">
            Name
          </label>

          <input
            value={data.inputName ?? ""}
            onChange={(e) => updateNodeField(id, "inputName", e.target.value)}
            className="w-full rounded-lg border border-border-dark bg-background-dark px-3 py-2 text-sm text-text-dark"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-text-dark-secondary">
            Type
          </label>

          <select
            value={data.inputType ?? "Text"}
            onChange={(e) => updateNodeField(id, "inputType", e.target.value)}
            className="w-full rounded-lg border border-border-dark bg-background-dark px-3 py-2 text-sm text-text-dark"
          >
            <option>Text</option>
            <option>File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  )
}
