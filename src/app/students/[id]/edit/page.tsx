'use client'

import React, { useState, useEffect } from 'react'
import { Box, Heading, VStack, FormControl, FormLabel, Input, NumberInput, NumberInputField, Button, SimpleGrid, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

// Temporary mock data function
const getStudentById = (id: string) => {
  const students = [
    { id: '1', name: 'John Doe', registrationNumber: '202401234', major: 'Computer Science', dob: '2001-05-05', gpa: 3.8 },
    { id: '2', name: 'Jane Smith', registrationNumber: '202401245', major: 'Mechanical Engineering', dob: '2002-05-21', gpa: 3.6 },
  ]
  return students.find(student => student.id === id)
}

export default function EditStudent({ params }: { params: { id: string } }) {
  const router = useRouter()
  const toast = useToast()
  const [student, setStudent] = useState({
    name: '',
    registrationNumber: '',
    major: '',
    dob: '',
    gpa: ''
  })

  useEffect(() => {
    const fetchedStudent = getStudentById(params.id)
    if (fetchedStudent) {
      setStudent(fetchedStudent)
    } else {
      toast({
        title: "Student not found",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      router.push('/students')
    }
  }, [params.id, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStudent(prev => ({ ...prev, [name]: value }))
  }

  const handleGPAChange = (value: string) => {
    setStudent(prev => ({ ...prev, gpa: parseFloat(value) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a PUT request to your API
    console.log('Updating student:', student)
    // For now, we'll just log the student and redirect
    toast({
      title: "Student updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
    router.push(`/students/${params.id}`)
  }

  return (
    <VStack spacing={8} align="stretch">
      <Heading as="h1" size="xl">Edit Student</Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <SimpleGrid columns={[1, null, 2]} spacing={6}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={student.name} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Registration Number</FormLabel>
            <Input name="registrationNumber" value={student.registrationNumber} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Major</FormLabel>
            <Input name="major" value={student.major} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Date of Birth</FormLabel>
            <Input name="dob" type="date" value={student.dob} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>GPA</FormLabel>
            <NumberInput min={0} max={4} step={0.1} value={student.gpa} onChange={handleGPAChange}>
              <NumberInputField name="gpa" />
            </NumberInput>
          </FormControl>
        </SimpleGrid>
        <Box mt={8}>
          <Button type="submit" colorScheme="blue" mr={4}>Update Student</Button>
          <Button variant="outline" onClick={() => router.push(`/students/${params.id}`)}>Cancel</Button>
        </Box>
      </Box>
    </VStack>
  )
}
