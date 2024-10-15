"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Heading,
  VStack,
  useColorModeValue,
  Text,
  useToast,
} from '@chakra-ui/react'
import { StudentForm } from '@/app/components/StudentForm'

export default function AddStudent() {
  const router = useRouter()
  const toast = useToast()
  const [student, setStudent] = useState({
    name: '',
    registrationNumber: '',
    major: '',
    dob: '',
    gpa: 0,
  })

  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.700', 'gray.300')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStudent(prev => ({ ...prev, [name]: value }))
  }

  const handleGPAChange = (value: string) => {
    setStudent(prev => ({ ...prev, gpa: parseFloat(value) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      })

      if (!response.ok) {
        throw new Error('Failed to add student')
      }

      toast({ 
        title: 'Success',
        description: 'Student added successfully',
        status: 'success',
          duration: 3000,
          isClosable: true,
      })
      router.push('/students')
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Box bg={bgColor} minH="100vh" p={8} className="dark:bg-gray-900">
      <VStack spacing={8} align="stretch" maxW="3xl" mx="auto">
        <Box>
          <Heading as="h1" size="2xl" mb={2} className="text-gray-900 dark:text-gray-100">
            Add New Student
          </Heading>
          <Text color={textColor}>
            Enter the student's information to add them to the system. All fields are required.
          </Text>
        </Box>

        <StudentForm
          student={student}
          handleChange={handleChange}
          handleGPAChange={handleGPAChange}
          handleSubmit={handleSubmit}
          handleCancel={() => router.push('/students')}
        />
      </VStack>
    </Box>
  )
}
