import React from 'react'
import { Box, Heading, Text, VStack, HStack, Button, Grid, GridItem } from '@chakra-ui/react'
import Link from 'next/link'
import { db } from '@/app/lib/db'
import { notFound } from 'next/navigation'

export default async function StudentDetail({ params }: { params: { id: string } }) {
  const student = await db.students.getById(params.id);

  if (!student) {
    notFound();
  }

  return (
    <VStack spacing={8} align="stretch">
      <HStack justify="space-between">
        <Heading as="h1" size="xl">{student.name}</Heading>
        <HStack>
          <Link href={`/students/${student.id}/edit`} passHref>
            <Button colorScheme="blue">Edit</Button>
          </Link>
          <Button colorScheme="red" variant="outline">Delete</Button>
        </HStack>
      </HStack>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <Text fontWeight="bold">Registration Number</Text>
          <Text>{student.registrationNumber}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold">Major</Text>
          <Text>{student.major}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold">Date of Birth</Text>
          <Text>{student.dob}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold">GPA</Text>
          <Text>{student.gpa}</Text>
        </GridItem>
      </Grid>
      <Box>
        <Link href="/students" passHref>
          <Button variant="outline">Back to Student List</Button>
        </Link>
      </Box>
    </VStack>
  )
}
