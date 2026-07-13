import { useCallback } from "react"

export function usePipelineDragDrop({
  reactFlow,
  getNodeID,
  addNode,
}) {
  const getInitialNodeData = (nodeId, type) => ({
    id: nodeId,
    nodeType: type,
  })

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      if (!reactFlow) {
        return
      }

      const data = event.dataTransfer.getData("application/reactflow")

      if (!data) {
        return
      }

      const { nodeType } = JSON.parse(data)

      if (!nodeType) {
        return
      }

      const position = reactFlow.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const nodeId = getNodeID(nodeType)

      addNode({
        id: nodeId,
        type: nodeType,
        position,
        data: getInitialNodeData(nodeId, nodeType),
      })
    },
    [reactFlow, getNodeID, addNode],
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  return {
    onDrop,
    onDragOver,
  }
}