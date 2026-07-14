export function DraggableNode({ type, label }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: type }),
    )

    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex h-16 min-w-24 cursor-grab items-center justify-center rounded-lg border border-border-dark bg-background-dark-secondary transition hover:border-primary-500"
    >
      <span className="text-sm font-medium text-text-dark">{label}</span>
    </div>
  )
}
