'use client'

import React from 'react'
import { Box, Heading, Text, VStack, HStack, Button, useColorModeValue, Icon, Divider } from '@chakra-ui/react'
import Link from 'next/link'
import { ArrowLeft, Edit, Trash2, GraduationCap, Calendar, BarChart2, BookOpen } from 'lucide-react'

export default function StudentDetailClient({ student }: { student: any }) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.700', 'gray.300')

  return (
    <Box bg={bgColor} minH="100vh" p={8} className="dark:bg-gray-900">
      <VStack spacing={8} align="stretch" maxW="3xl" mx="auto">
      <HStack justify="space-between" wrap="wrap" spacing={4}>
          <Link href="/students" passHref>
            <Button leftIcon={<ArrowLeft size={16} />} variant="ghost" size="sm">
              Back to Student List
            </Button>
          </Link>
          <HStack spacing={4}>
            <Link href={`/students/${student.id}/edit`} passHref>
              <Button leftIcon={<Edit size={16} />} colorScheme="blue" size="sm">
                Edit
              </Button>
            </Link>
            <Button leftIcon={<Trash2 size={16} />} colorScheme="red" variant="ghost" size="sm">
              Delete
            </Button>
          </HStack>
        </HStack>

        <VStack align="start" spacing={6} p={6} borderWidth="1px" borderColor={borderColor} borderRadius="md" className="hover:shadow-md transition-shadow">
          <Heading as="h1" size="2xl" className="text-gray-900 dark:text-gray-100">
            {student.name}
          </Heading>
          <Divider />
          <VStack align="start" spacing={4} width="100%">
            <HStack>
              <Icon as={BookOpen} boxSize={5} color="blue.500" />
              <Text fontWeight="bold" color={textColor}>Registration Number:</Text>
              <Text color={textColor}>{student.registrationNumber}</Text>
            </HStack>
            <HStack>
              <Icon as={GraduationCap} boxSize={5} color="green.500" />
              <Text fontWeight="bold" color={textColor}>Major:</Text>
              <Text color={textColor}>{student.major}</Text>
            </HStack>
            <HStack>
              <Icon as={Calendar} boxSize={5} color="purple.500" />
              <Text fontWeight="bold" color={textColor}>Date of Birth:</Text>
              <Text color={textColor}>{new Date(student.dob).toLocaleDateString()}</Text>
            </HStack>
            <HStack>
              <Icon as={BarChart2} boxSize={5} color="orange.500" />
              <Text fontWeight="bold" color={textColor}>GPA:</Text>
              <Text color={textColor}>{student.gpa.toFixed(2)}</Text>
            </HStack>
          </VStack>
        </VStack>

        <Box>
          <Heading as="h2" size="lg" mb={4} className="text-gray-800 dark:text-gray-200">
            Academic Performance
          </Heading>
          <Text color={textColor}>
            {student.name} is majoring in {student.major} with a current GPA of {student.gpa.toFixed(2)}. 
            {student.gpa >= 3.5 ? 
              " This excellent academic performance puts them in the top tier of their class." : 
              student.gpa >= 3.0 ? 
              " This good academic standing shows consistent effort in their studies." :
              " There's room for improvement in their academic performance."}
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4} className="text-gray-800 dark:text-gray-200">
            Recommendations
          </Heading>
          <VStack align="start" spacing={2}>
            {student.gpa < 3.0 && (
              <Text color={textColor}>• Consider enrolling in tutoring sessions to improve academic performance.</Text>
            )}
            <Text color={textColor}>• Schedule a meeting with the academic advisor to discuss course selection for next semester.</Text>
            <Text color={textColor}>• Explore internship opportunities related to the {student.major} field.</Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}

