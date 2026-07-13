import { useRef, useState } from "react"
import { useWorkflowStore } from "../../store/workflow.store"
import { shallow } from "zustand/shallow"
import { InputNode } from "../../nodes/InputNode"
import { LLMNode } from "../../nodes/LLMNode"
import { OutputNode } from "../../nodes/OutputNode"
import { TextNode } from "../../nodes/TextNode"
import { usePipelineDragDrop } from "../../hooks/usePipelineDragDrop"
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react"

const gridSize = 20

const proOptions = { hideAttribution: true }

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
}

export function PipelineCanvas() {
  const wrapperRef = useRef(null)

  const [reactFlow, setReactFlow] = useState(null)

  const nodes = useWorkflowStore((state) => state.nodes)
  const edges = useWorkflowStore((state) => state.edges)
  const addNode = useWorkflowStore((state) => state.addNode)
  const getNodeID = useWorkflowStore((state) => state.getNodeID)
  const onNodesChange = useWorkflowStore((state) => state.onNodesChange)
  const onEdgesChange = useWorkflowStore((state) => state.onEdgesChange)
  const onConnect = useWorkflowStore((state) => state.onConnect)

  const { onDrop, onDragOver } = usePipelineDragDrop({
    reactFlow,
    getNodeID,
    addNode,
  })

  return (
    <>
      <div ref={wrapperRef} style={{ width: "100vw", height: "70vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlow}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  )
}
