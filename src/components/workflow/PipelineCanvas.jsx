import { useRef, useState } from "react"
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  BackgroundVariant,
} from "@xyflow/react"

import { InputNode } from "../nodes/InputNode"
import { LLMNode } from "../nodes/LLMNode"
import { OutputNode } from "../nodes/OutputNode"
import { TextNode } from "../nodes/TextNode"

import { usePipelineDragDrop } from "../../hooks/usePipelineDragDrop"
import { useWorkflowStore } from "../../store/workflow.store"

const GRID_SIZE = 20

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
}

const PipelineCanvas = () => {
  const wrapperRef = useRef(null)

  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  const nodes = useWorkflowStore((state) => state.nodes)
  const edges = useWorkflowStore((state) => state.edges)
  const addNode = useWorkflowStore((state) => state.addNode)
  const getNodeID = useWorkflowStore((state) => state.getNodeID)
  const onNodesChange = useWorkflowStore((state) => state.onNodesChange)
  const onEdgesChange = useWorkflowStore((state) => state.onEdgesChange)
  const onConnect = useWorkflowStore((state) => state.onConnect)

  const { onDrop, onDragOver } = usePipelineDragDrop({
    reactFlow: reactFlowInstance,
    getNodeID,
    addNode,
  })

  return (
    // <div
    //   ref={wrapperRef}
    //   className="h-screen w-full overflow-hidden bg-background-dark"
    // >

    <div ref={wrapperRef} className="h-full w-full bg-gray-950">
      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        snapToGrid
        snapGrid={[GRID_SIZE, GRID_SIZE]}
        connectionLineType="smoothstep"
        proOptions={{ hideAttribution: true }}
        className="bg-background-dark"
        defaultEdgeOptions={{
          style: {
            stroke: "#ff6392",
            strokeWidth: 2,
          },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color="#334155"
        />

        <MiniMap
          pannable
          zoomable
          className="bg-surface-dark border border-border-dark"
          nodeColor="#ff6392"
          maskColor="rgba(2,6,23,0.75)"
          position="top-right"
        />

        {/* <MiniMap pannable zoomable className="bg-gray-900" /> */}

        <Controls position="top-left" />

        {/* <Controls className="border border-gray-700 bg-gray-900" /> */}
      </ReactFlow>
    </div>
  )
}

export default PipelineCanvas
