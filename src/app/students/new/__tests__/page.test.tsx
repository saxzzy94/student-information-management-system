import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddStudent from '../page'
import { ChakraProvider } from '@chakra-ui/react'

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    }
  },
}))

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as jest.Mock

describe('AddStudent Component', () => {
  beforeEach(() => {
    render(
      <ChakraProvider>
        <AddStudent />
      </ChakraProvider>
    )
  })

  test('renders form fields', () => {
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Registration Number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Major/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/GPA/i)).toBeInTheDocument()
  })

  test('displays error messages for empty fields', async () => {
    fireEvent.click(screen.getByText(/Add Student/i))

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/Registration Number is required/i)).toBeInTheDocument()
      expect(screen.getByText(/Major is required/i)).toBeInTheDocument()
      expect(screen.getByText(/Date of Birth is required/i)).toBeInTheDocument()
      expect(screen.getByText(/GPA is required/i)).toBeInTheDocument()
    })
  })

  test('validates GPA range', async () => {
    await userEvent.type(screen.getByLabelText(/GPA/i), '5')
    fireEvent.click(screen.getByText(/Add Student/i))

    await waitFor(() => {
      expect(screen.getByText(/GPA must be between 0 and 4/i)).toBeInTheDocument()
    })
  })

  test('submits form with valid data', async () => {
    await userEvent.type(screen.getByLabelText(/Name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/Registration Number/i), '12345')
    await userEvent.type(screen.getByLabelText(/Major/i), 'Computer Science')
    await userEvent.type(screen.getByLabelText(/Date of Birth/i), '2000-01-01')
    await userEvent.type(screen.getByLabelText(/GPA/i), '3.5')

    fireEvent.click(screen.getByText(/Add Student/i))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/students', expect.any(Object))
    })
  })
})
