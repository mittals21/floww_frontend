export function DraggableNode({ type, label }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: type }),
    )

    event.dataTransfer.effectAllowed = "move"
    event.currentTarget.style.cursor = "grabbing"
  }

  const handleDragEnd = (event) => {
    event.currentTarget.style.cursor = "grab"
  }

  return (
    <div
      className={type}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        cursor: "grab",
        minWidth: 80,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: 8,
        backgroundColor: "#1C2536",
      }}
    >
      <span style={{ color: "#fff" }}>{label}</span>
    </div>
  )
}
