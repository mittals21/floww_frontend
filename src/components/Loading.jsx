import React from "react"

const Loading = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background-dark">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 shadow-lg">
        <span className="text-2xl font-bold text-white">F</span>
      </div>

      <div className="h-10 w-10 animate-spin rounded-full border-4 border-border-dark border-t-primary-500" />

      <p className="mt-6 text-lg font-semibold text-text-dark">Floww</p>

      <p className="mt-1 text-sm text-text-dark-secondary">
        Preparing your workspace...
      </p>
    </div>
  )
}

export default Loading
