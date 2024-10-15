export interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

let students: Student[] = [
  { id: '1', name: 'John Doe', registrationNumber: '202401234', major: 'Computer Science', dob: '2001-05-05', gpa: 3.8 },
  { id: '2', name: 'Jane Smith', registrationNumber: '202401245', major: 'Mechanical Engineering', dob: '2002-05-21', gpa: 3.6 },
  { id: '3', name: 'Michael Johnson', registrationNumber: '202401256', major: 'Electrical Engineering', dob: '2003-03-15', gpa: 3.4 },
  { id: '4', name: 'Emily Davis', registrationNumber: '202401267', major: 'Civil Engineering', dob: '2004-01-28', gpa: 3.7 },
  { id: '5', name: 'William Taylor', registrationNumber: '202401278', major: 'Aerospace Engineering', dob: '2005-02-10', gpa: 3.9 },
  { id: '6', name: 'Sarah Lee', registrationNumber: '202401289', major: 'Biological Engineering', dob: '2006-04-01', gpa: 3.5 },
  { id: '7', name: 'Olivia Brown', registrationNumber: '2024012100', major: 'Chemical Engineering', dob: '2007-06-12', gpa: 3.3 },
  { id: '8', name: 'Benjamin White', registrationNumber: '2024012111', major: 'Industrial Engineering', dob: '2008-07-25', gpa: 3.2 },
  { id: '9', name: 'Hannah Martin', registrationNumber: '2024012122', major: 'Materials Science and Engineering', dob: '2009-08-18', gpa: 3.1 },
  { id: '10', name: 'Alexander Harris', registrationNumber: '2024012133', major: 'Nuclear Engineering', dob: '2010-09-02', gpa: 3.0 },
];

export const db = {
  students: {
    getAll: () => students,
    getById: (id: string) => students.find(student => student.id === id),
    create: (student: Omit<Student, 'id'>) => {
      const newStudent = { ...student, id: (students.length + 1).toString() };
      students.push(newStudent);
      return newStudent;
    },
    update: (id: string, updatedStudent: Omit<Student, 'id'>) => {
      const index = students.findIndex(student => student.id === id);
      if (index !== -1) {
        students[index] = { ...updatedStudent, id };
        return students[index];
      }
      return null;
    },
    delete: (id: string) => {
      const index = students.findIndex(student => student.id === id);
      if (index !== -1) {
        const deletedStudent = students[index];
        students = students.filter(student => student.id !== id);
        return deletedStudent;
      }
      return null;
    },
    search: (term: string, category: 'name' | 'major' | 'gpa') => {
      const searchTerm = term.toLowerCase();
      return students.filter(student => {
        switch (category) {
          case 'name':
            return student.name.toLowerCase().includes(searchTerm);
          case 'major':
            return student.major.toLowerCase().includes(searchTerm);
          case 'gpa':
            return student.gpa.toString().includes(searchTerm);
          default:
            return true;
        }
      });
    }
  }
};
