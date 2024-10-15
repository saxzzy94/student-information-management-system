'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Moon, Sun } from 'lucide-react'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('white', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center" py={4}>
          <NextLink href="/" passHref>
            <Heading as="span" size="lg" cursor="pointer" className="text-gray-900 dark:text-gray-100">
              SIMS
            </Heading>
          </NextLink>
          <HStack spacing={4}>
            <NextLink href="/students" passHref>
              <Button as="span" variant="ghost">
                Students
              </Button>
            </NextLink>
            <NextLink href="/courses" passHref>
              <Button as="span" variant="ghost">
                Courses
              </Button>
            </NextLink>
            <Button onClick={toggleColorMode} variant="ghost">
              {colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
