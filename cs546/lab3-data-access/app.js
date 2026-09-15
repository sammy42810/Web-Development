/**
 * Samantha Bryan
 * I pledge my honor that I have abided by the Stevens Honor System.
 */

import { getStudentById, studentsInCourse, getInstructorsByStudentID } from './students.js';
import { getMostPopularCourses, getDepartmentCourseStats, getCourseById } from './courses.js';
import { getInstructorRoster, instructorsByDepartment, getInstructorById } from './instructors.js';

async function main() {

    // getStudentById
    try {
        const r = await getStudentById('f1746e7a-327c-48f0-9ca2-eacadaa10429');
        console.log('getStudentById (valid):', r);
    } catch (e) { console.log('getStudentById (valid) ERROR:', e.message); }

    try {
        await getStudentById(-1);
        console.log('getStudentById (number) should have thrown');
    } catch (e) { console.log('getStudentById (number) threw (expected):', e.message); }

    try {
        await getStudentById();
        console.log('getStudentById (no arg) should have thrown');
    } catch (e) { console.log('getStudentById (no arg) threw (expected):', e.message); }

    try {
        await getStudentById('   ');
        console.log('getStudentById (spaces) should have thrown');
    } catch (e) { console.log('getStudentById (spaces) threw (expected):', e.message); }

    try {
        await getStudentById('00000000-0000-0000-0000-000000000000');
        console.log('getStudentById (not found) should have thrown');
    } catch (e) { console.log('getStudentById (not found) threw (expected):', e.message); }

    // studentsInCourse
    try {
        const r = await studentsInCourse('Intro to Calculus');
        console.log('studentsInCourse (valid):', r);
    } catch (e) { console.log('studentsInCourse (valid) ERROR:', e.message); }

    try {
        const r = await studentsInCourse('  intro to calculus  ');
        console.log('studentsInCourse (case+trim):', r);
    } catch (e) { console.log('studentsInCourse (case+trim) ERROR:', e.message); }

    try {
        await studentsInCourse('Fake Course Name XYZ');
        console.log('studentsInCourse (not found) should have thrown');
    } catch (e) { console.log('studentsInCourse (not found) threw (expected):', e.message); }

    try {
        await studentsInCourse(123);
        console.log('studentsInCourse (number) should have thrown');
    } catch (e) { console.log('studentsInCourse (number) threw (expected):', e.message); }

    try {
        await studentsInCourse('   ');
        console.log('studentsInCourse (spaces) should have thrown');
    } catch (e) { console.log('studentsInCourse (spaces) threw (expected):', e.message); }

    // getInstructorsByStudentID
    try {
        const r = await getInstructorsByStudentID('f1746e7a-327c-48f0-9ca2-eacadaa10429');
        console.log('getInstructorsByStudentID (valid):', r);
    } catch (e) { console.log('getInstructorsByStudentID (valid) ERROR:', e.message); }

    try {
        await getInstructorsByStudentID('00000000-0000-0000-0000-000000000000');
        console.log('getInstructorsByStudentID (not found) should have thrown');
    } catch (e) { console.log('getInstructorsByStudentID (not found) threw (expected):', e.message); }

    try {
        await getInstructorsByStudentID(123);
        console.log('getInstructorsByStudentID (number) should have thrown');
    } catch (e) { console.log('getInstructorsByStudentID (number) threw (expected):', e.message); }

    try {
        await getInstructorsByStudentID('   ');
        console.log('getInstructorsByStudentID (spaces) should have thrown');
    } catch (e) { console.log('getInstructorsByStudentID (spaces) threw (expected):', e.message); }

    // getMostPopularCourses
    try {
        const r = await getMostPopularCourses();
        console.log('getMostPopularCourses:', r);
    } catch (e) { console.log('getMostPopularCourses ERROR:', e.message); }

    // getDepartmentCourseStats
    try {
        const r = await getDepartmentCourseStats('Computer Science');
        console.log('getDepartmentCourseStats (valid):', r);
    } catch (e) { console.log('getDepartmentCourseStats (valid) ERROR:', e.message); }

    try {
        const r = await getDepartmentCourseStats('  computer science  ');
        console.log('getDepartmentCourseStats (case+trim):', r);
    } catch (e) { console.log('getDepartmentCourseStats (case+trim) ERROR:', e.message); }

    try {
        await getDepartmentCourseStats('Department Foobar');
        console.log('getDepartmentCourseStats (not found) should have thrown');
    } catch (e) { console.log('getDepartmentCourseStats (not found) threw (expected):', e.message); }

    try {
        await getDepartmentCourseStats(123);
        console.log('getDepartmentCourseStats (number) should have thrown');
    } catch (e) { console.log('getDepartmentCourseStats (number) threw (expected):', e.message); }

    try {
        await getDepartmentCourseStats('   ');
        console.log('getDepartmentCourseStats (spaces) should have thrown');
    } catch (e) { console.log('getDepartmentCourseStats (spaces) threw (expected):', e.message); }

    // getCourseById
    try {
        const r = await getCourseById('2aee101e-b3ff-463d-a35c-5343db413aa5');
        console.log('getCourseById (valid):', r);
    } catch (e) { console.log('getCourseById (valid) ERROR:', e.message); }

    try {
        await getCourseById(1001);
        console.log('getCourseById (number) should have thrown');
    } catch (e) { console.log('getCourseById (number) threw (expected):', e.message); }

    try {
        await getCourseById();
        console.log('getCourseById (no arg) should have thrown');
    } catch (e) { console.log('getCourseById (no arg) threw (expected):', e.message); }

    try {
        await getCourseById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log('getCourseById (not found) should have thrown');
    } catch (e) { console.log('getCourseById (not found) threw (expected):', e.message); }

    // getInstructorRoster
    try {
        const r = await getInstructorRoster('9286cc8b-0de8-43bb-8ba7-a180e4aa99c1');
        console.log('getInstructorRoster (valid):', JSON.stringify(r, null, 2));
    } catch (e) { console.log('getInstructorRoster (valid) ERROR:', e.message); }

    try {
        await getInstructorRoster('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log('getInstructorRoster (not found) should have thrown');
    } catch (e) { console.log('getInstructorRoster (not found) threw (expected):', e.message); }

    try {
        await getInstructorRoster(123);
        console.log('getInstructorRoster (number) should have thrown');
    } catch (e) { console.log('getInstructorRoster (number) threw (expected):', e.message); }

    try {
        await getInstructorRoster('   ');
        console.log('getInstructorRoster (spaces) should have thrown');
    } catch (e) { console.log('getInstructorRoster (spaces) threw (expected):', e.message); }

    // instructorsByDepartment
    try {
        const r = await instructorsByDepartment('Physics');
        console.log('instructorsByDepartment (valid):', r);
    } catch (e) { console.log('instructorsByDepartment (valid) ERROR:', e.message); }

    try {
        const r = await instructorsByDepartment('  physics  ');
        console.log('instructorsByDepartment (case+trim):', r);
    } catch (e) { console.log('instructorsByDepartment (case+trim) ERROR:', e.message); }

    try {
        await instructorsByDepartment('Department Foobar');
        console.log('instructorsByDepartment (not found) should have thrown');
    } catch (e) { console.log('instructorsByDepartment (not found) threw (expected):', e.message); }

    try {
        await instructorsByDepartment(123);
        console.log('instructorsByDepartment (number) should have thrown');
    } catch (e) { console.log('instructorsByDepartment (number) threw (expected):', e.message); }

    try {
        await instructorsByDepartment('   ');
        console.log('instructorsByDepartment (spaces) should have thrown');
    } catch (e) { console.log('instructorsByDepartment (spaces) threw (expected):', e.message); }

    // getInstructorById 
    try {
        const r = await getInstructorById('83f76fec-5d6b-4789-a70e-41e574a16aa2');
        console.log('getInstructorById (valid):', r);
    } catch (e) { console.log('getInstructorById (valid) ERROR:', e.message); }

    try {
        await getInstructorById(1001);
        console.log('getInstructorById (number) should have thrown');
    } catch (e) { console.log('getInstructorById (number) threw (expected):', e.message); }

    try {
        await getInstructorById();
        console.log('getInstructorById (no arg) should have thrown');
    } catch (e) { console.log('getInstructorById (no arg) threw (expected):', e.message); }

    try {
        await getInstructorById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log('getInstructorById (not found) should have thrown');
    } catch (e) { console.log('getInstructorById (not found) threw (expected):', e.message); }
}

main();
