import { useWorkflowStore } from "../../store/workflow.store"
import BaseNode from "./BaseNode"

export const TextNode = ({ id, data }) => {
  const updateNodeField = useWorkflowStore((state) => state.updateNodeField)

  return (
    <BaseNode
      title="Text"
      sourceHandles={[
        {
          id: `${id}-output`,
        },
      ]}
    >
      <div>
        <label className="mb-1 block text-xs text-text-dark-secondary">
          Prompt
        </label>

        <textarea
          rows={4}
          value={data.text ?? ""}
          onChange={(e) => updateNodeField(id, "text", e.target.value)}
          placeholder="Write your prompt..."
          className="w-full resize-none rounded-lg border border-border-dark bg-background-dark px-3 py-2 text-sm text-text-dark"
        />
      </div>
    </BaseNode>
  )
}
