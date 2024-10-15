"use client";

import { useState, useEffect } from "react";
import {
	Box,
	Container,
	Heading,
	Text,
	VStack,
	useColorMode,
	useColorModeValue,
	Flex,
	SimpleGrid,
} from "@chakra-ui/react";
import {
	BookOpen,
	GraduationCap,
	Users,
	BarChart2,
} from "lucide-react";
import { ActionButton } from "./components/ActionButton";
import { FeatureCard } from "./components/FeatureCard";

const features = [
	{
		icon: BookOpen,
		title: "Course Management",
		description: "Easily manage and track student courses and academic progress.",
	},
	{
		icon: Users,
		title: "Student Profiles",
		description: "Comprehensive student profiles with all relevant information.",
	},
	{
		icon: BarChart2,
		title: "Performance Analytics",
		description: "Visualize student performance with intuitive charts and graphs.",
	},
	{
		icon: GraduationCap,
		title: "Graduation Tracking",
		description: "Monitor student progress towards graduation requirements.",
	},
];

export default function Home() {
	const [mounted, setMounted] = useState(false);
	const { colorMode } = useColorMode();
	const bgColor = useColorModeValue("gray.50", "gray.900");
	const textColor = useColorModeValue("gray.700", "gray.300");

	// Prevent hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<Box
			bg={bgColor}
			minH="100vh"
			className={colorMode === "dark" ? "dark" : ""}
		>
			<Container maxW="container.xl" pt={8} pb={16}>
				<VStack spacing={12} align="stretch">
					<VStack spacing={4} textAlign="left" align="start">
						<Heading
							as="h1"
							size="2xl"
							fontWeight="bold"
							className="text-gray-900 dark:text-gray-100"
						>
							Student Information Management System
						</Heading>
						<Text fontSize="xl" color={textColor} maxW="2xl">
							Efficiently manage and track student information with our
							intuitive system. Streamline administrative tasks and enhance
							student success.
						</Text>
					</VStack>

					<Flex wrap="wrap" gap={4}>
						<ActionButton href="/students">View Student List</ActionButton>
						<ActionButton href="/students/new">Add New Student</ActionButton>
					</Flex>

					<VStack spacing={8} align="stretch">
						<Heading
							as="h2"
							size="xl"
							className="text-gray-800 dark:text-gray-200"
						>
							Key Features
						</Heading>
						<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
							{features.map((feature, index) => (
								<FeatureCard key={index} feature={feature} />
							))}
						</SimpleGrid>
					</VStack>
				</VStack>
			</Container>
		</Box>
	);
}
