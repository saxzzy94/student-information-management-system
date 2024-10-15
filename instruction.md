# Student Information Management System

This document describes the requirements to generate system design documentation for an
EdTech app using Next.JS and Tailwind CSS to test your technical skills as part of Miva’s
recruitment process.
Requirements
This exercise should take at most 1 working day to complete.
Project Overview
To create a simple Student Information Management System using Next.JS. The goal is to allow
users to view, add, edit and delete student records.

1. Student List Page:
  ● A landing page (/students) that lists all students with their names, registration
  numbers and majors.
  ● Each student entry should link to a detailed student information page.
2. Dynamic Student Detail Page:
  ● Each student should have a unique dynamic route (/students/[id]) that displays
  their full profile information, such as:
    ○ Name
    ○ Registration Number
    ○ Major
    ○ Date of Birth
    ○ GPA
  ● The data for each student should be fetched either via SSR (getServerSideProps) or SSG (getStaticProps).
3. Add/Edit Student
● Create a page (/students/new) for adding a new student record with a form that
collects the student’s name, registration number, major, date of birth and GPA.
● Provide an edit feature for updating a student’s record (/students/[id]/edit).
● Data should be stored and updated via a Next.js API route.
4. Delete Student:
● Implement a delete functionality on the student’s detail page that allows removing
a student from the system.
5. API Routes:
● Create the following API endpoints to manage the student data:
○ GET /api/students: Fetch all students.
○ POST /api/students: Add a new student.
○ GET /api/students/[id]: Fetch a single student’s details.
○ PUT /api/students/[id]: Update a student’s details.
○ DELETE /api/students/[id]: Delete a student.
6. Database Integration:
● Use an in-memory database or a local file to simulate the backend.
7. TypeScript & Tailwind CSS:
● The project should be written in TypeScript and styled using Tailwind CSS for
simple, responsive design. The UI library should be Chakra UI.
Bonus Points
1. Search/Filter:
● Implement a search feature that allows filtering students by name, major or GPA.
2. Form Validation:
● Add client-side and server-side validation for form inputs, e.g., required fields,
valid GPA range.
3. Unit Tests:
● Add unit tests for critical components (e.g., form validation, API endpoints) using
Jest or React Testing Library.
4. Authentication:
● (Optional) Implement basic user authentication for accessing the student
information management system.
Example JSON response for /api/students:

```json
  [
    {
    "id": "1",
    "name": "John Doe",
    "registrationNumber": "202401234",
    "major": "Computer Science",
    "dob": "2001-05-05",
    "gpa": 3.8
    },
    {
    "id": "2",
    "name": "Jane Smith",
    "registrationNumber": "202401245",
    "major": "Mechanical Engineering",
    "dob": "2002-05-21",
    "gpa": 3.6
    }
  ]
```

What we’ll be looking at
Once complete, we’ll examine the following:
● Functionality:
○ Proper use of API routes and dynamic routing to manage student data.
○ Correct implementation of SSR/SSG for fetching data.
● Code Quality:
○ Clean, readable and modular code with proper use of TypeScript.
○ Separation of concerns between API logic, UI components and database
operations.
● UI/UX:
○ Simple, intuitive design that follows responsive design principles using Chakra UI
and Tailwind CSS.
● Documentation:
○ A clear README file explaining how to run the project, install dependencies, and
an overview of the development approach.
It is important to note that the goal of the test is to judge the candidate’s analytical thinking,
resourcefulness, UX experience and creativity to find solutions to real-life scenarios and their
ability to communicate or guide developers in implementing such solutions. Therefore, your
focus shouldn’t be on implementing every single edge case or making sure the UI is perfect. It is
better to ensure your app system design document is thorough and your coding structure
includes important design patterns, coding standards and principles that as a Senior you would
provide to juniors as template of work.
