"use client"

import React, { useState, useEffect } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  VStack,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { SearchIcon, UserPlusIcon } from 'lucide-react'
import { StudentTable } from '@/app/components/StudentTable'

interface Student {
  id: string
  name: string
  registrationNumber: string
  major: string
  gpa: number
}

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchCategory, setSearchCategory] = useState('name')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/students')
        if (!response.ok) {
          throw new Error('Failed to fetch students')
        }
        const data = await response.json()
        setStudents(data)
        setFilteredStudents(data)
      } catch (err) {
        setError('An error occurred while fetching students. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudents()
  }, [])

  useEffect(() => {
    const filtered = students.filter(student => {
      const searchValue = searchTerm.toLowerCase()
      switch (searchCategory) {
        case 'name':
          return student.name.toLowerCase().includes(searchValue)
        case 'major':
          return student.major.toLowerCase().includes(searchValue)
        case 'gpa':
          return student.gpa.toString().includes(searchValue)
        default:
          return true
      }
    })
    setFilteredStudents(filtered)
  }, [searchTerm, searchCategory, students])

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Heading as="h1" size="xl" className="text-gray-800 dark:text-white">
            Student Management System
          </Heading>
          <Button
            as={NextLink}
            href="/students/new"
            colorScheme="blue"
            leftIcon={<UserPlusIcon className="w-5 h-5" />}
            className="hover:bg-blue-600 transition-colors"
          >
            Add New Student
          </Button>
        </Flex>

        <Text fontSize="lg" color="gray.600" className="dark:text-gray-300">
          Manage and view all students in the system. Use the search functionality to find specific students.
        </Text>

        <Flex gap={4} align="center" wrap="wrap">
          <Select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            width="auto"
            className="border-gray-300 dark:border-gray-600"
          >
            <option value="name">Name</option>
            <option value="major">Major</option>
            <option value="gpa">GPA</option>
          </Select>
          <Flex flex={1} position="relative">
            <Input
              placeholder={`Search by ${searchCategory}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              pr="40px"
              className="border-gray-300 dark:border-gray-600"
            />
            <SearchIcon className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
          </Flex>
        </Flex>

        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Box
          overflowX="auto"
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow="sm"
        >
          <StudentTable students={filteredStudents} isLoading={isLoading} />
        </Box>

        <Text fontSize="sm" color="gray.500" textAlign="center" className="dark:text-gray-400">
          Showing {filteredStudents.length} out of {students.length} total students
        </Text>
      </VStack>
    </Container>
  )
}
