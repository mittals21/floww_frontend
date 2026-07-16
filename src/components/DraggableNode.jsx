// export function DraggableNode({ type, label }) {
//   const handleDragStart = (event) => {
//     event.dataTransfer.setData(
//       "application/reactflow",
//       JSON.stringify({ nodeType: type }),
//     )

//     event.dataTransfer.effectAllowed = "move"
//   }

//   return (
//     <div
//       draggable
//       onDragStart={handleDragStart}
//       className="flex h-16 min-w-24 cursor-grab items-center justify-center rounded-lg border border-border-dark bg-background-dark-secondary transition hover:border-primary-500"
//     >
//       <span className="text-sm font-medium text-text-dark">{label}</span>
//     </div>
//   )
// }

export function DraggableNode({ type, label, icon, color }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({
        nodeType: type,
      }),
    )

    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`cursor-grab rounded-xl border ${color} p-3 transition hover:scale-[1.02] hover:border-primary-500 active:cursor-grabbing`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-xl">
          {icon}
        </div>

        <div>
          <h3 className="font-medium">{label}</h3>
        </div>
      </div>
    </div>
  )
}
