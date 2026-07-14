import { useWorkflowStore } from "../../store/workflow.store"
import BaseNode from "./BaseNode"

export const LLMNode = ({ id, data }) => {
  const updateNodeField = useWorkflowStore((state) => state.updateNodeField)

  return (
    <BaseNode
      title="LLM"
      targetHandles={[
        {
          id: `${id}-system`,
          style: { top: "35%" },
        },
        {
          id: `${id}-prompt`,
          style: { top: "65%" },
        },
      ]}
      sourceHandles={[
        {
          id: `${id}-response`,
        },
      ]}
    >
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs text-text-dark-secondary">
            Model
          </label>

          <select
            value={data.model ?? "gpt-4o-mini"}
            onChange={(e) => updateNodeField(id, "model", e.target.value)}
            className="w-full rounded-lg border border-border-dark bg-background-dark px-3 py-2 text-sm text-text-dark"
          >
            <option value="gpt-4o-mini">GPT-4o Mini</option>
            <option value="gpt-4.1">GPT-4.1</option>
            <option value="gpt-4.1-mini">GPT-4.1 Mini</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-text-dark-secondary">
            Temperature
          </label>

          <input
            type="number"
            min={0}
            max={2}
            step={0.1}
            value={data.temperature ?? 0.7}
            onChange={(e) =>
              updateNodeField(id, "temperature", Number(e.target.value))
            }
            className="w-full rounded-lg border border-border-dark bg-background-dark px-3 py-2 text-sm text-text-dark"
          />
        </div>
      </div>
    </BaseNode>
  )
}
