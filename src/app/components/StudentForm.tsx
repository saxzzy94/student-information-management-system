import React from 'react'
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  SimpleGrid,
  Box,
  Divider,
  Icon,
} from '@chakra-ui/react'
import { Save, X, User, BookOpen, GraduationCap, Calendar, BarChart2 } from 'lucide-react'

interface StudentFormProps {
  student: {
    name: string
    registrationNumber: string
    major: string
    dob: string
    gpa: number
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleGPAChange: (value: string) => void
  handleSubmit: (e: React.FormEvent) => void
  handleCancel: () => void
  isEdit?: boolean
}

export const StudentForm: React.FC<StudentFormProps> = ({
  student,
  handleChange,
  handleGPAChange,
  handleSubmit,
  handleCancel,
  isEdit = false,
}) => {
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={6} align="stretch">
        <SimpleGrid columns={[1, null, 2]} spacing={6}>
          <FormControl isRequired>
            <FormLabel>
              <Icon as={User} className="inline mr-2" />
              Name
            </FormLabel>
            <Input
              name="name"
              value={student.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>
              <Icon as={BookOpen} className="inline mr-2" />
              Registration Number
            </FormLabel>
            <Input
              name="registrationNumber"
              value={student.registrationNumber}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>
              <Icon as={GraduationCap} className="inline mr-2" />
              Major
            </FormLabel>
            <Input
              name="major"
              value={student.major}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>
              <Icon as={Calendar} className="inline mr-2" />
              Date of Birth
            </FormLabel>
            <Input
              name="dob"
              type="date"
              value={student.dob}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>
              <Icon as={BarChart2} className="inline mr-2" />
              GPA
            </FormLabel>
            <NumberInput
              min={0}
              max={4}
              step={0.1}
              value={student.gpa}
              onChange={handleGPAChange}
            >
              <NumberInputField name="gpa" />
            </NumberInput>
          </FormControl>
        </SimpleGrid>

        <Divider my={4} />

        <Box>
          <Button
            type="submit"
            colorScheme="blue"
            leftIcon={<Save size={16} />}
            mr={4}
          >
            {isEdit ? 'Update' : 'Add'} Student
          </Button>
          <Button
            variant="ghost"
            onClick={handleCancel}
            leftIcon={<X size={16} />}
          >
            Cancel
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}
