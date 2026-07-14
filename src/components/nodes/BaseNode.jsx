import { Handle, Position } from "@xyflow/react"

const BaseNode = ({
  title,
  children,
  sourceHandles = [],
  targetHandles = [],
}) => {
  return (
    <div className="w-72 overflow-hidden rounded-xl border border-border-dark bg-surface-dark shadow-xl">
      {targetHandles.map((handle) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={handle.style}
          className="h-3 w-3 border-2 border-surface-dark bg-primary-500"
        />
      ))}

      {sourceHandles.map((handle) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={handle.style}
          className="h-3 w-3 border-2 border-surface-dark bg-primary-500"
        />
      ))}

      <div className="border-b border-border-dark bg-background-dark-secondary px-4 py-3">
        <h3 className="text-sm font-semibold text-text-dark">{title}</h3>
      </div>

      <div className="space-y-4 p-4">{children}</div>
    </div>
  )
}

export default BaseNode
