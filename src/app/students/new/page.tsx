'use client'

import React, { useState } from 'react'
import { Box, Heading, VStack, FormControl, FormLabel, Input, NumberInput, NumberInputField, Button, SimpleGrid, FormErrorMessage, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

interface FormErrors {
  name?: string;
  registrationNumber?: string;
  major?: string;
  dob?: string;
  gpa?: string;
}

export default function AddStudent() {
  const router = useRouter()
  const toast = useToast()
  const [student, setStudent] = useState({
    name: '',
    registrationNumber: '',
    major: '',
    dob: '',
    gpa: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStudent(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleGPAChange = (value: string) => {
    setStudent(prev => ({ ...prev, gpa: value }))
    // Clear error when user changes GPA
    setErrors(prev => ({ ...prev, gpa: undefined }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!student.name) newErrors.name = 'Name is required'
    if (!student.registrationNumber) newErrors.registrationNumber = 'Registration Number is required'
    if (!student.major) newErrors.major = 'Major is required'
    if (!student.dob) newErrors.dob = 'Date of Birth is required'
    if (!student.gpa) {
      newErrors.gpa = 'GPA is required'
    } else {
      const gpa = parseFloat(student.gpa)
      if (isNaN(gpa) || gpa < 0 || gpa > 4) newErrors.gpa = 'GPA must be between 0 and 4'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to add student')
      }

      toast({
        title: 'Student added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/students')
    } catch (error) {
      toast({
        title: 'Error adding student',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <VStack spacing={8} align="stretch">
      <Heading as="h1" size="xl">Add New Student</Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <SimpleGrid columns={[1, null, 2]} spacing={6}>
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={student.name} onChange={handleChange} />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.registrationNumber}>
            <FormLabel>Registration Number</FormLabel>
            <Input name="registrationNumber" value={student.registrationNumber} onChange={handleChange} />
            <FormErrorMessage>{errors.registrationNumber}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.major}>
            <FormLabel>Major</FormLabel>
            <Input name="major" value={student.major} onChange={handleChange} />
            <FormErrorMessage>{errors.major}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.dob}>
            <FormLabel>Date of Birth</FormLabel>
            <Input name="dob" type="date" value={student.dob} onChange={handleChange} />
            <FormErrorMessage>{errors.dob}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.gpa}>
            <FormLabel>GPA</FormLabel>
            <NumberInput min={0} max={4} step={0.1} value={student.gpa} onChange={handleGPAChange}>
              <NumberInputField name="gpa" />
            </NumberInput>
            <FormErrorMessage>{errors.gpa}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>
        <Box mt={8}>
          <Button type="submit" colorScheme="blue" mr={4}>Add Student</Button>
          <Button variant="outline" onClick={() => router.push('/students')}>Cancel</Button>
        </Box>
      </Box>
    </VStack>
  )
}
