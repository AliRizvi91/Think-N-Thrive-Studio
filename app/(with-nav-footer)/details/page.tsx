'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DetailsPage from '@/components/Dashboard/DetailsPage'
import { useAppSelector } from '@/components/reduxComponents/ReduxHook'

function Page() {
  const { user } = useAppSelector((state) => state.StoreOfUser)
  const router = useRouter()

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/') // redirect to home
    }
  }, [user, router])

  if (!user) return (
    <>
    <div className="h-screen w-full flex justify-center items-center">
      <h1 className='text-7xl font-black'>💀 SORRY… NOT FOR YOU 💀</h1>
    </div>
    </>
  )
  if (user.role !== 'admin') return null

  return <DetailsPage />
}

export default Page
