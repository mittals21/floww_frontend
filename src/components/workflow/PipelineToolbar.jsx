// import { Link, useNavigate } from "react-router-dom"
// import { DraggableNode } from "../DraggableNode"
// import { useWorkflowStore } from "../../store/workflow.store"

// const NODE_TYPES = [
//   {
//     type: "customInput",
//     label: "Input",
//   },
//   {
//     type: "llm",
//     label: "LLM",
//   },
//   {
//     type: "customOutput",
//     label: "Output",
//   },
//   {
//     type: "text",
//     label: "Text",
//   },
// ]

// const PipelineToolbar = ({ id }) => {
//   const navigate = useNavigate()

//   const workflow = useWorkflowStore((state) => state.selectedWorkflow)
//   const nodes = useWorkflowStore((state) => state.nodes)
//   const edges = useWorkflowStore((state) => state.edges)

//   const setWorkflowData = useWorkflowStore((state) => state.setWorkflowData)
//   const updateWorkflow = useWorkflowStore((state) => state.updateWorkflow)
//   const deleteWorkflow = useWorkflowStore((state) => state.deleteWorkflow)

//   const getWorkflow = useWorkflowStore((state) => state.getWorkflow)
//   const runWorkflow = useWorkflowStore((state) => state.runWorkflow)
//   const isExecuting = useWorkflowStore((state) => state.isExecuting)
//   const executionResult = useWorkflowStore((state) => state.executionResult)

//   const handleSave = async () => {
//     if (!workflow) return

//     await updateWorkflow({
//       workflowId: workflow.id,
//       name: workflow.name,
//       description: workflow.description,
//       nodes,
//       edges,
//     })
//   }

//   const handleDelete = async () => {
//     if (!workflow) return

//     await deleteWorkflow(workflow.id)

//     navigate("/")
//   }

//   return (
//     <div className="border-b border-border-dark bg-surface-dark">
//       <div className="flex items-center justify-between px-6 py-4">
//         <div className="flex items-start gap-4">
//           <Link
//             to="/"

//             className="rounded-xl border border-border-dark bg-surface-dark px-4 py-2.5 transition hover:-translate-y-0.5 hover:border-primary-500 hover:bg-surface-dark-secondary duration-200 text-sm text-text-dark-secondary hover:text-white"
//           >
//             ←
//           </Link>

//           <div className="flex flex-col gap-2">
//             <input
//               value={workflow?.name ?? ""}
//               onChange={(e) =>
//                 setWorkflowData({
//                   name: e.target.value,
//                 })
//               }
//               placeholder="Untitled Workflow"
//               className="w-80 rounded-lg border border-border-dark bg-background-dark-secondary px-4 py-2 text-neutral-100 outline-none transition focus:border-primary-500"
//             />

//             <input
//               value={workflow?.description ?? ""}
//               onChange={(e) =>
//                 setWorkflowData({
//                   description: e.target.value,
//                 })
//               }
//               placeholder="Add a description..."
//               className="w-80 rounded-lg border border-border-dark bg-background-dark-secondary px-4 py-2 text-sm text-neutral-300 outline-none transition focus:border-primary-500 placeholder:text-text-dark-secondary"
//             />
//           </div>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={handleSave}
//             className="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
//           >
//             Save
//           </button>

//           <button
//             onClick={handleDelete}
//             className="rounded-lg border border-danger-600 px-4 py-2 text-danger-500 hover:bg-danger-600/10"
//           >
//             Delete
//           </button>
//         </div>
//       </div>

//       <div className="flex gap-3 border-t border-border-dark px-6 py-4">
//         {NODE_TYPES.map((node) => (
//           <DraggableNode key={node.type} type={node.type} label={node.label} />
//         ))}

//         <div className="flex justify-end px-6 pb-4">
//           <button
//             onClick={() => runWorkflow(id)}

//             disabled={isExecuting}

//             className="rounded-lg bg-primary-600 px-5 py-2 font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {isExecuting ? "Running..." : "▶ Run Workflow"}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PipelineToolbar

import { Link } from "react-router-dom"
import { DraggableNode } from "../DraggableNode"

const NODE_TYPES = [
  {
    type: "customInput",
    label: "Input",
    icon: "📥",
    color: "bg-emerald-500/15 border-emerald-500/40",
  },
  {
    type: "text",
    label: "Text",
    icon: "📝",
    color: "bg-sky-500/15 border-sky-500/40",
  },
  {
    type: "llm",
    label: "LLM",
    icon: "🤖",
    color: "bg-violet-500/15 border-violet-500/40",
  },
  {
    type: "customOutput",
    label: "Output",
    icon: "📤",
    color: "bg-orange-500/15 border-orange-500/40",
  },
]

const PipelineToolbar = () => {
  return (
    <aside className="flex w-50 flex-col border-r border-gray-800 bg-gray-900">
      <div className="flex items-center px-5 border-b border-gray-800">
        <Link
          to="/"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 transition hover:border-primary-500 hover:bg-gray-800 px-3"
        >
          ←
        </Link>

        <div className=" p-5">
          <h2 className="text-lg font-semibold">Nodes</h2>

          <p className="mt-1 text-sm text-gray-400">
            Drag a node onto the canvas.
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {NODE_TYPES.map((node) => (
          <DraggableNode key={node.type} {...node} />
        ))}
      </div>
    </aside>
  )
}

export default PipelineToolbar
