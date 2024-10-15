import React from 'react'
import { Box, Heading, Text, VStack, HStack, Button, Icon, Divider } from '@chakra-ui/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Edit, Trash2, GraduationCap, Calendar, BarChart2, BookOpen } from 'lucide-react'
import { db } from '@/app/lib/db'
import StudentDetailClient from './StudentDetailClient'

async function getStudent(id: string) {
  const student = await db.students.getById(id)
  if (!student) {
    notFound()
  }
  return student
}

export default async function StudentDetail({ params }: { params: { id: string } }) {
  const student = await getStudent(params.id)

  return <StudentDetailClient student={student} />
}
