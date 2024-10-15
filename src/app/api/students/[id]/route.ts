import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const student = db.students.getById(params.id);
  if (student) {
    return NextResponse.json(student);
  } else {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const updatedStudent = db.students.update(params.id, body);
  if (updatedStudent) {
    return NextResponse.json(updatedStudent);
  } else {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const deletedStudent = db.students.delete(params.id);
  if (deletedStudent) {
    return NextResponse.json(deletedStudent);
  } else {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }
}
