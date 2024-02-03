"use client"
import { useMyPresence, useOthers } from "@/liveblocks.config"
import LiveCursors from "./cursor/LiveCursors"
import { useCallback } from "react"

export default function Live() {
  const others = useOthers()
  const [{ cursor }, updateMyPresence] = useMyPresence() as any

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault()
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y
    console.log("x: ", x)
    console.log("y: ", y)
    updateMyPresence({
      cursor: {
        x,
        y,
      },
    })
  }, [])

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault()

    updateMyPresence({ cursor: null, message: null })
  }, [])

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y
    updateMyPresence({ cursor: { x, y } })
  }, [])

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="flex h-[100vh] w-full items-center justify-center text-center"
    >
      <LiveCursors others={others} />
      <h1 className="text-5xl text-white"> Copixel</h1>
    </div>
  )
}
