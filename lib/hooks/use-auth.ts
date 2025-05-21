import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '@/lib/store'

export function useAuth() {
  const router = useRouter()
  const user = useStore((state) => state.user)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  return { user, isAuthenticated: !!user }
} 