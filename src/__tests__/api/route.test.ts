/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import {
	getAllStudents,
	searchStudents,
	createNewStudent,
} from "../../app/api/students/route";
import { GET as getStudentById } from "@/app/api/students/[id]/route";
import { db, Student } from "@/app/lib/db";

jest.mock("@/app/lib/db", () => ({
	db: {
		students: {
			getAll: jest.fn(),
			search: jest.fn(),
			create: jest.fn(),
			getById: jest.fn(),
		},
	},
}));

describe("Students API", () => {
	const mockStudents: Student[] = [
		{
			id: "1",
			name: "John Doe",
			registrationNumber: "",
			major: "",
			dob: "",
			gpa: 0,
		},
	];

	describe("GET /api/students", () => {
		it("returns all students when no search params", async () => {
			(db.students.getAll as jest.Mock).mockReturnValue(mockStudents);

			const req = new NextRequest("http://localhost:3000/api/students");
			const res = await getAllStudents(req);
			const data = await res.json();
			expect(res.status).toBe(200);
			expect(data).toEqual(mockStudents);
			expect(db.students.getAll).toHaveBeenCalled();
		});

		it("returns filtered students when search params are provided", async () => {
			(db.students.search as jest.Mock).mockReturnValue(mockStudents);

			const req = new NextRequest(
				"http://localhost:3000/api/students?search=John&category=name"
			);
			const res = await searchStudents(req);
			const data = await res.json();

			expect(data).toEqual(mockStudents);
			expect(db.students.search).toHaveBeenCalledWith("John", "name");
		});

		it("returns 400 for invalid search parameters", async () => {
			const req = new NextRequest(
				"http://localhost:3000/api/students?search=John"
			);
			const res = await searchStudents(req);

			expect(res.status).toBe(400);
			expect(await res.json()).toHaveProperty("error");
		});
	});

	describe("POST /api/students", () => {
		it("creates a new student with valid data", async () => {
			const newStudent = {
				name: "Jane Doe",
				registrationNumber: "12345",
				major: "Computer Science",
				dob: "2000-01-01",
				gpa: 3.5,
			};
			(db.students.create as jest.Mock).mockReturnValue({
				id: "2",
				...newStudent,
			});

			const req = new NextRequest("http://localhost:3000/api/students", {
				method: "POST",
				body: JSON.stringify(newStudent),
			});
			const res = await createNewStudent(req);
			const data = await res.json();

			expect(res.status).toBe(201);
			expect(data).toEqual({ id: "2", ...newStudent });
			expect(db.students.create).toHaveBeenCalledWith(newStudent);
		});

		it("returns 400 for invalid data", async () => {
			const invalidStudent = {
				name: "Jane Doe",
			};

			const req = new NextRequest("http://localhost:3000/api/students", {
				method: "POST",
				body: JSON.stringify(invalidStudent),
			});
			const res = await createNewStudent(req);

			expect(res.status).toBe(400);
			expect(await res.json()).toHaveProperty("message");
		});
	});

	describe("GET /api/students/:id", () => {
		it("returns a student by ID", async () => {
			const student = {
				id: "1",
				name: "John Doe",
				registrationNumber: "",
				major: "",
				dob: "",
				gpa: 0,
			};
			(db.students.getById as jest.Mock).mockReturnValue(student);

			const req = new NextRequest(
				`http://localhost:3000/api/students/${student.id}`
			);
			const res = await getStudentById(req, { params: { id: student.id } });
			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data).toEqual(student);
		});
	});
});
