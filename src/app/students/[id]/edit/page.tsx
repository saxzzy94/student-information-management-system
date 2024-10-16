"use client";

import React, { useState, useEffect } from "react";
import {
	Box,
	Heading,
	VStack,
	FormControl,
	FormLabel,
	Input,
	NumberInput,
	NumberInputField,
	Button,
	SimpleGrid,
	useToast,
	useColorModeValue,
	Text,
	Divider,
	Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {
	ArrowLeft,
	Save,
	X,
	User,
	BookOpen,
	GraduationCap,
	Calendar,
	BarChart2,
} from "lucide-react";

// Temporary mock data function
const getStudentById = (id: string) => {
	const students = [
		{
			id: "1",
			name: "John Doe",
			registrationNumber: "202401234",
			major: "Computer Science",
			dob: "2001-05-05",
			gpa: 3.8,
		},
		{
			id: "2",
			name: "Jane Smith",
			registrationNumber: "202401245",
			major: "Mechanical Engineering",
			dob: "2002-05-21",
			gpa: 3.6,
		},
	];
	return students.find((student) => student.id === id);
};

export default function EditStudent({ params }: { params: { id: string } }) {
	const router = useRouter();
	const toast = useToast();
	const [student, setStudent] = useState({
		name: "",
		registrationNumber: "",
		major: "",
		dob: "",
		gpa: 0,
	});

	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.300");

	useEffect(() => {
		fetch(`/api/students/${params.id}`)
			.then((res) => res.json())
			.then((data) => {
				setStudent(data);
			})
			.catch((error) => {
				toast({
					title: "Student not found",
					status: "error",
					duration: 3000,
				isClosable: true,
			});
			router.push("/students");
		});
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setStudent((prev) => ({ ...prev, [name]: value }));
	};

	const handleGPAChange = (value: string) => {
		setStudent((prev) => ({ ...prev, gpa: parseFloat(value) }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetch(`/api/students/${params.id}`, {
			method: "PUT",
			body: JSON.stringify(student),
		}).then((res) => {
			if (res.ok) {
				toast({
					title: "Student updated successfully",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			}
		});
		
		router.push(`/students/${params.id}`);
	};

	return (
		<Box bg={bgColor} minH="100vh" p={8} className="dark:bg-gray-900">
			<VStack spacing={8} align="stretch" maxW="3xl" mx="auto">
				<Box>
					<Button
						leftIcon={<ArrowLeft size={16} />}
						variant="ghost"
						onClick={() => router.push(`/students/${params.id}`)}
						mb={4}
					>
						Back to Student Details
					</Button>
					<Heading
						as="h1"
						size="2xl"
						mb={2}
						className="text-gray-900 dark:text-gray-100"
					>
						Edit Student Information
					</Heading>
					<Text color={textColor}>
						Update the student's details below. All fields are required.
					</Text>
				</Box>

				<Box
					as="form"
					onSubmit={handleSubmit}
					bg={bgColor}
					borderWidth="1px"
					borderColor={borderColor}
					borderRadius="md"
					p={6}
					className="hover:shadow-md transition-shadow"
				>
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
								Update Student
							</Button>
							<Button
								variant="ghost"
								onClick={() => router.push(`/students/${params.id}`)}
								leftIcon={<X size={16} />}
							>
								Cancel
							</Button>
						</Box>
					</VStack>
				</Box>

				<Box>
					<Heading
						as="h2"
						size="lg"
						mb={4}
						className="text-gray-800 dark:text-gray-200"
					>
						Editing Guidelines
					</Heading>
					<Text color={textColor} mb={2}>
						When updating student information, please keep in mind:
					</Text>
					<VStack align="start" spacing={2} color={textColor}>
						<Text>
							• Ensure all fields are filled out completely and accurately.
						</Text>
						<Text>
							• The GPA should be entered as a number between 0.0 and 4.0.
						</Text>
						<Text>• Double-check the registration number for accuracy.</Text>
						<Text>
							• If the major has changed, make sure it's reflected in the
							system.
						</Text>
					</VStack>
				</Box>
			</VStack>
		</Box>
	);
}
