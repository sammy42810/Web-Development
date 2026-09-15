//you can use this file to create helper functions if you wish. You do not have to use it if you do not want to.
/**
 * Samantha Bryan
 * I pledge my honor that I have abided by the Stevens Honor System.
 */

import axios from 'axios';

const getStudents = async () => {
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/cc90ea979b1154ac0723db6836487173/raw/534613a0e7f88f91a73b6b7d2f00afb41966724d/students.json");
    return data;
};

const getInstructors = async () => {
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/6024ad5ae58e05f08142bd1ba7cf6291/raw/34b06695d017dd3a6908da656cd1864be7371a3a/instructors.json");
    return data;
};

const getCourses = async () => {
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/48d339a9be4828b9180456c9dd65e86a/raw/d714026734fd00d35092f20e71b8025536e1eb69/courses.json");
    return data;
};

export { getStudents, getInstructors, getCourses };