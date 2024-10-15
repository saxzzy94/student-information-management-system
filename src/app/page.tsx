'use client'

import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <VStack spacing={8} align="stretch">
      <Heading as="h1" size="2xl" fontWeight="bold">
        Student Information Management System
      </Heading>
      <Text fontSize="xl" color="gray.600">
        Efficiently manage and track student information with our intuitive system.
      </Text>
      <Box>
        <Link href="/students" passHref>
          <Button colorScheme="blue" size="lg" fontWeight="medium">
            View Student List
          </Button>
        </Link>
      </Box>
    </VStack>
  )
}
