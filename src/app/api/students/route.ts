import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function getAllStudents(request: NextRequest) {
	const students = db.students.getAll();
	return NextResponse.json(students, { status: 200 });
}

export async function searchStudents(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const searchTerm = searchParams.get("search");
	const searchCategory = searchParams.get("category") as
		| "name"
		| "major"
		| "gpa"
		| null;

	if (searchTerm && searchCategory) {
		const students = db.students.search(searchTerm, searchCategory);
		return NextResponse.json(students);
	} else {
		return NextResponse.json({ error: "Invalid search parameters" }, { status: 400 });
	}
}

export async function createNewStudent(request: NextRequest) {
	try {
		const body = await request.json();

		// Server-side validation
		if (!body.name || typeof body.name !== "string") {
			return NextResponse.json(
				{ message: "Name is required and must be a string" },
				{ status: 400 }
			);
		}
		if (
			!body.registrationNumber ||
			typeof body.registrationNumber !== "string"
		) {
			return NextResponse.json(
				{ message: "Registration Number is required and must be a string" },
				{ status: 400 }
			);
		}
		if (!body.major || typeof body.major !== "string") {
			return NextResponse.json(
				{ message: "Major is required and must be a string" },
				{ status: 400 }
			);
		}
		if (
			!body.dob ||
			typeof body.dob !== "string" ||
			isNaN(Date.parse(body.dob))
		) {
			return NextResponse.json(
				{
					message: "Date of Birth is required and must be a valid date string",
				},
				{ status: 400 }
			);
		}
		if (
			!body.gpa ||
			typeof body.gpa !== "number" ||
			body.gpa < 0 ||
			body.gpa > 4
		) {
			return NextResponse.json(
				{ message: "GPA is required and must be a number between 0 and 4" },
				{ status: 400 }
			);
		}

		const newStudent = db.students.create(body);
		return NextResponse.json(newStudent, { status: 201 });
	} catch (error) {
		console.error("Error creating student:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

