'use client'

import React from 'react'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function DeleteButton({ studentId }: { studentId: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this student?')) {
      const response = await fetch(`/api/students/${studentId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/students')
        router.refresh()
      } else {
        alert('Failed to delete student')
      }
    }
  }

  return (
    <Button colorScheme="red" variant="outline" onClick={handleDelete}>
      Delete
    </Button>
  )
}
