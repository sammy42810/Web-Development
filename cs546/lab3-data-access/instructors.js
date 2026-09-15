//Export the following functions using ES6 Syntax
/**
 * Samantha Bryan
 * I pledge my honor that I have abided by the Stevens Honor System.
 */

import { getStudents, getCourses, getInstructors } from './helpers.js';

const getInstructorRoster = async (instructorId) => {
    if (instructorId === undefined || instructorId === null) throw new Error('instructorId parameter is required');
    if (typeof instructorId !== 'string') throw new Error('instructorId must be a string');
    if (instructorId.trim().length === 0) throw new Error('instructorId cannot be empty or only spaces');

    const instructors = await getInstructors();
    const instructor = instructors.find((i) => i.id === instructorId);
    if (!instructor) throw new Error(`Instructor not found with id: ${instructorId}`);

    const courses = await getCourses();
    
    const instructorCourses = courses.filter((c) => c.instructor === instructorId);

    if (instructorCourses.length === 0) {
        return { instructorName: `${instructor.first_name} ${instructor.last_name}`, courses: [] };
    }

    const students = await getStudents();
    const courseList = instructorCourses
        .sort((a, b) => a.course_name.localeCompare(b.course_name))
        .map((c) => {
            const enrolled = students
                .filter((s) => s.enrolled_courses.includes(c.id))
                .sort((a, b) => a.last_name.localeCompare(b.last_name))
                .map((s) => `${s.first_name} ${s.last_name}`);
            return { courseName: c.course_name, enrolledStudents: enrolled };
        });

    return {
        instructorName: `${instructor.first_name} ${instructor.last_name}`,
        courses: courseList
    };
};

const instructorsByDepartment = async (department) => {
    if (department === undefined || department === null) throw new Error('department parameter is required');
    if (typeof department !== 'string') throw new Error('department must be a string');
    const trimmed = department.trim();
    if (trimmed.length === 0) throw new Error('department cannot be empty or only spaces');

    const instructors = await getInstructors();

    const matches = instructors.filter((i) => i.department.toLowerCase() === trimmed.toLowerCase());
    if (matches.length === 0) throw new Error(`No instructors found for department: ${trimmed}`);

    return matches
        .sort((a, b) => a.last_name.localeCompare(b.last_name))
        .map((i) => `${i.first_name} ${i.last_name}`);
};

const getInstructorById = async (id) => {
    if (id === undefined || id === null) throw new Error('id parameter is required');
    if (typeof id !== 'string') throw new Error('id must be a string');
    if (id.trim().length === 0) throw new Error('id cannot be empty or only spaces');
 
    const instructors = await getInstructors();
    const instructor = instructors.find((i) => i.id === id);
    if (!instructor) throw new Error(`Instructor not found with id: ${id}`);
    return instructor;
};

export {
    getInstructorRoster, 
    instructorsByDepartment,
    getInstructorById
};