export function buildNodeIDs(nodes = []) {
  const nodeIDs = {}

  for (const node of nodes) {
    const [type, number] = node.id.split("-")

    const id = Number(number)

    if (Number.isNaN(id)) continue

    nodeIDs[type] = Math.max(nodeIDs[type] ?? 0, id)
  }

  return nodeIDs
}
