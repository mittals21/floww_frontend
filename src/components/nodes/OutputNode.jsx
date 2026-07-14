import { useWorkflowStore } from "../../store/workflow.store"
import BaseNode from "./BaseNode"

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useWorkflowStore((state) => state.updateNodeField)

  return (
    <BaseNode
      title="Output"
      targetHandles={[
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
            value={data.outputName ?? ""}
            onChange={(e) => updateNodeField(id, "outputName", e.target.value)}
            className="w-full rounded-lg border border-border-dark bg-background-dark px-3 py-2 text-sm text-text-dark"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-text-dark-secondary">
            Type
          </label>

          <select
            value={data.outputType ?? "Text"}
            onChange={(e) => updateNodeField(id, "outputType", e.target.value)}
            className="w-full rounded-lg border border-border-dark bg-background-dark px-3 py-2 text-sm text-text-dark"
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </div>
      </div>
    </BaseNode>
  )
}
