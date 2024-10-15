import React from 'react'
import NextLink from 'next/link'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Skeleton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { UserPlusIcon, BookOpenIcon, GraduationCapIcon } from 'lucide-react'

interface Student {
  id: string
  name: string
  registrationNumber: string
  major: string
  gpa: number
}

interface StudentTableProps {
  students: Student[]
  isLoading: boolean
}

export const StudentTable: React.FC<StudentTableProps> = ({ students, isLoading }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const renderTableContent = () => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <Tr key={index}>
          <Td><Skeleton height="20px" /></Td>
          <Td><Skeleton height="20px" /></Td>
          <Td><Skeleton height="20px" /></Td>
          <Td><Skeleton height="20px" /></Td>
          <Td><Skeleton height="20px" width="100px" /></Td>
        </Tr>
      ))
    }

    if (students.length === 0) {
      return (
        <Tr>
          <Td colSpan={5} textAlign="center" py={8}>
            <Text fontSize="lg" color="gray.500">No students found</Text>
          </Td>
        </Tr>
      )
    }

    return students.map((student) => (
      <Tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <Td>{student.name}</Td>
        <Td>{student.registrationNumber}</Td>
        <Td>{student.major}</Td>
        <Td>{student.gpa.toFixed(2)}</Td>
        <Td>
          <NextLink href={`/students/${student.id}`} passHref>
            <Button
              as="a"
              colorScheme="blue"
              size="sm"
              variant="outline"
              className="hover:bg-blue-50 dark:hover:bg-blue-900"
            >
              View Details
            </Button>
          </NextLink>
        </Td>
      </Tr>
    ))
  }

  return (
    <Table variant="simple">
      <Thead className="bg-gray-50 dark:bg-gray-700">
        <Tr>
          <Th><Flex align="center" gap={2}><UserPlusIcon className="w-4 h-4" /> Name</Flex></Th>
          <Th><Flex align="center" gap={2}><BookOpenIcon className="w-4 h-4" /> Registration Number</Flex></Th>
          <Th><Flex align="center" gap={2}><GraduationCapIcon className="w-4 h-4" /> Major</Flex></Th>
          <Th>GPA</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {renderTableContent()}
      </Tbody>
    </Table>
  )
}
