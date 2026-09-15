//Export the following functions using ES6 Syntax
/**
 * Samantha Bryan
 * I pledge my honor that I have abided by the Stevens Honor System.
 */

import { getStudents, getCourses, getInstructors } from './helpers.js';

const getMostPopularCourses = async () => {
    const courses = await getCourses();
    if (courses.length === 0) throw new Error('No courses found');

    const students = await getStudents();

    const enrollmentMap = {};
    for (const student of students) {
        for (const courseId of student.enrolled_courses) {
            enrollmentMap[courseId] = (enrollmentMap[courseId] || 0) + 1;
        }
    }


    return courses
        .filter((c) => (enrollmentMap[c.id] || 0) >= 1)
        .sort((a, b) => {
            const diff = (enrollmentMap[b.id] || 0) - (enrollmentMap[a.id] || 0);
            if (diff !== 0) return diff;
            return a.course_name.localeCompare(b.course_name);
        })
        .map((c) => c.course_name);
};

const getDepartmentCourseStats = async (department) => {
    if (department === undefined || department === null) throw new Error('department parameter is required');
    if (typeof department !== 'string') throw new Error('department must be a string');
    const trimmed = department.trim();
    if (trimmed.length === 0)  throw new Error('department cannot be empty or only spaces');

    const courses = await getCourses();
    const deptCourses = courses.filter((c) => c.department.toLowerCase() === trimmed.toLowerCase());
    if (deptCourses.length === 0) throw new Error(`No department found with name: ${trimmed}`);

    const departmentName = deptCourses[0].department;
    const totalCourses = deptCourses.length;
    const totalCredits = deptCourses.reduce((sum, c) => sum + c.credits, 0);
    const averageCredits = parseFloat((totalCredits / totalCourses).toFixed(2));

    const instructors = await getInstructors();
    const seenIds = new Set();
    const instructorList = [];
    for (const course of deptCourses) {
        if (!seenIds.has(course.instructor)) {
            seenIds.add(course.instructor);
            const inst = instructors.find((i) => i.id === course.instructor);
            if (inst) instructorList.push(inst);
        }
    }
    instructorList.sort((a, b) => a.last_name.localeCompare(b.last_name));

    return {
        department: departmentName,
        totalCourses,
        totalCredits,
        averageCredits,
        instructors: instructorList.map((i) => `${i.first_name} ${i.last_name}`)
    };
};

const getCourseById = async (id) => {
    if (id === undefined || id === null) throw new Error('id parameter is required');
    if (typeof id !== 'string') throw new Error('id must be a string');
    if (id.trim().length === 0) throw new Error('id cannot be empty or only spaces');

    const courses = await getCourses();
    const course = courses.find((c) => c.id === id);
    if (!course) throw new Error(`Course not found with id: ${id}`);
    return course;
};

export {
    getMostPopularCourses,
    getDepartmentCourseStats,
    getCourseById
};