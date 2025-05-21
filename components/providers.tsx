"use client"

import { useEffect, useState } from "react"
import { useCart } from "@/lib/store/cart"

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return null
  }

  return <>{children}</>
} 