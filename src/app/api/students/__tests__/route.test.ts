import { NextRequest } from 'next/server'
import { GET, POST } from '../route'
import { db } from '@/app/lib/db'

// Mock the db module
jest.mock('@/app/lib/db', () => ({
  db: {
    students: {
      getAll: jest.fn(),
      search: jest.fn(),
      create: jest.fn(),
    },
  },
}))

describe('Students API', () => {
  describe('GET', () => {
    it('returns all students when no search params', async () => {
      const mockStudents = [{ id: '1', name: 'John Doe' }]
      ;(db.students.getAll as jest.Mock).mockReturnValue(mockStudents)

      const req = new NextRequest('http://localhost:3000/api/students')
      const res = await GET(req)
      const data = await res.json()

      expect(data).toEqual(mockStudents)
      expect(db.students.getAll).toHaveBeenCalled()
    })

    it('returns filtered students when search params are provided', async () => {
      const mockStudents = [{ id: '1', name: 'John Doe' }]
      ;(db.students.search as jest.Mock).mockReturnValue(mockStudents)

      const req = new NextRequest('http://localhost:3000/api/students?search=John&category=name')
      const res = await GET(req)
      const data = await res.json()

      expect(data).toEqual(mockStudents)
      expect(db.students.search).toHaveBeenCalledWith('John', 'name')
    })
  })

  describe('POST', () => {
    it('creates a new student with valid data', async () => {
      const newStudent = {
        name: 'Jane Doe',
        registrationNumber: '12345',
        major: 'Computer Science',
        dob: '2000-01-01',
        gpa: 3.5,
      }
      ;(db.students.create as jest.Mock).mockReturnValue({ id: '2', ...newStudent })

      const req = new NextRequest('http://localhost:3000/api/students', {
        method: 'POST',
        body: JSON.stringify(newStudent),
      })
      const res = await POST(req)
      const data = await res.json()

      expect(res.status).toBe(201)
      expect(data).toEqual({ id: '2', ...newStudent })
      expect(db.students.create).toHaveBeenCalledWith(newStudent)
    })

    it('returns 400 for invalid data', async () => {
      const invalidStudent = {
        name: 'Jane Doe',
        // Missing required fields
      }

      const req = new NextRequest('http://localhost:3000/api/students', {
        method: 'POST',
        body: JSON.stringify(invalidStudent),
      })
      const res = await POST(req)

      expect(res.status).toBe(400)
      expect(await res.json()).toHaveProperty('message')
    })
  })
})
