//Export the following functions using ES6 Syntax
/**
 * Samantha Bryan
 * I pledge my honor that I have abided by the Stevens Honor System.
 */

import { getStudents, getCourses, getInstructors } from './helpers.js';

const getStudentById = async (id) => {
    if (id === undefined || id === null) throw new Error('id parameter is required');
    if (typeof id !== 'string') throw new Error('id must be a string');
    if (id.trim().length === 0) throw new Error('id cannot be empty or only spaces');

    const students = await getStudents();
    const student = students.find((s) => s.id === id);
    if (!student) throw new Error(`Student not found with id: ${id}`);
    return student;
};

const studentsInCourse = async (courseName) => {
    if (courseName === undefined || courseName === null) throw new Error('courseName parameter is required');
    if (typeof courseName !== 'string') throw new Error('courseName must be a string');
    const trimmed = courseName.trim();
    if (trimmed.length === 0) throw new Error('courseName cannot be empty or only spaces');

    const courses = await getCourses();
    const matchingCourses = courses.filter((c) => c.course_name.toLowerCase() === trimmed.toLowerCase());
    if (matchingCourses.length === 0) throw new Error(`No course found with name: ${trimmed}`);

    const courseIds = new Set(matchingCourses.map((c) => c.id));

    const students = await getStudents();

    const enrolled = students.filter((s) => s.enrolled_courses.some((id) => courseIds.has(id)));
    if (enrolled.length === 0) throw new Error(`No students enrolled in course: ${trimmed}`);

    return enrolled.sort((a, b) => a.last_name.localeCompare(b.last_name));
};

const getInstructorsByStudentID = async (studentId) => {
    if (studentId === undefined || studentId === null) throw new Error('studentId parameter is required');
    if (typeof studentId !== 'string') throw new Error('studentId must be a string');
    if (studentId.trim().length === 0) throw new Error('studentId cannot be empty or only spaces');

    const students = await getStudents();
    const student = students.find((s) => s.id === studentId);
    if (!student) throw new Error(`Student not found with id: ${studentId}`);

    if (student.enrolled_courses.length === 0) return {};

    const courses = await getCourses();
    
    const instructors = await getInstructors();

    const result = {};
    for (const courseId of student.enrolled_courses) {
        const course = courses.find((c) => c.id === courseId);
        if (!course) throw new Error(`Course not found with id: ${courseId}`);

        const instructor = instructors.find((i) => i.id === course.instructor);
        if (!instructor) throw new Error(`Instructor not found for course: ${course.course_name}`);

        result[course.course_name] = `${instructor.first_name} ${instructor.last_name}`;
    }

    return result;
};


export {
    getStudentById,
    studentsInCourse,
    getInstructorsByStudentID
};
