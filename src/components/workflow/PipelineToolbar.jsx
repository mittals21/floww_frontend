import { DraggableNode } from "../DraggableNode"

const NODE_TYPES = [
  {
    type: "customInput",
    label: "Input",
  },
  {
    type: "llm",
    label: "LLM",
  },
  {
    type: "customOutput",
    label: "Output",
  },
  {
    type: "text",
    label: "Text",
  },
]

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {NODE_TYPES.map((node) => (
          <DraggableNode key={node.type} type={node.type} label={node.label} />
        ))}
      </div>
    </div>
  )
}
