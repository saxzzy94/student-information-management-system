'use client'

import React, { useState, useEffect } from 'react'
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, VStack, HStack, Input, Select } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Student } from '@/app/lib/db'

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchCategory, setSearchCategory] = useState('name')

  useEffect(() => {
    fetch('/api/students')
      .then(response => response.json())
      .then(data => {
        setStudents(data)
        setFilteredStudents(data)
      })
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
    <VStack spacing={8} align="stretch">
      <HStack justify="space-between">
        <Heading as="h1" size="xl">Student List</Heading>
        <Button as={NextLink} href="/students/new" colorScheme="blue">
          Add New Student
        </Button>
      </HStack>
      <HStack>
        <Select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} width="auto">
          <option value="name">Name</option>
          <option value="major">Major</option>
          <option value="gpa">GPA</option>
        </Select>
        <Input
          placeholder={`Search by ${searchCategory}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </HStack>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Registration Number</Th>
              <Th>Major</Th>
              <Th>GPA</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredStudents.map((student) => (
              <Tr key={student.id}>
                <Td>{student.name}</Td>
                <Td>{student.registrationNumber}</Td>
                <Td>{student.major}</Td>
                <Td>{student.gpa}</Td>
                <Td>
                  <NextLink href={`/students/${student.id}`} passHref>
                    <Button colorScheme="blue" size="sm" variant="outline">View Details</Button>
                  </NextLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  )
}
