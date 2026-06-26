# Web Backend — Node.js

A series of Node.js labs building up backend data access patterns with ES6 modules, async/await, and thorough input validation.

## Labs

### Lab 1 — Async Fundamentals

Introduction to async/await and Promise-based patterns in Node.js. Exercises on chaining async operations, error propagation, and handling edge cases.

### Lab 2 — Utility Functions

Modular utility libraries for common data manipulation:

- **`arrayUtils.js`** — filtering, transforming, and aggregating arrays
- **`stringUtils.js`** — string normalization, parsing, and validation helpers
- **`objectUtils.js`** — object merging, key extraction, and restructuring

### Lab 3 — Data Access Layer

A multi-module async data access system over a simulated dataset of students, courses, and instructors:

| Module           | Key Functions                                                         |
| ---------------- | --------------------------------------------------------------------- |
| `students.js`    | `getStudentById`, `studentsInCourse`, `getInstructorsByStudentID`     |
| `courses.js`     | `getMostPopularCourses`, `getDepartmentCourseStats`, `getCourseById`  |
| `instructors.js` | `getInstructorRoster`, `instructorsByDepartment`, `getInstructorById` |
| `helpers.js`     | Shared data-fetching utilities                                        |

Each function validates inputs strictly (type checks, null/undefined guards, whitespace-only strings) and throws descriptive errors for invalid inputs, following real-world API design patterns.

### Lab 4 — MongoDB Data Access

A CRUD data access layer backed by MongoDB. Manages gym equipment records with full create, read, update, and delete operations.

| Function                   | Description                                      |
| -------------------------- | ------------------------------------------------ |
| `createEquipmentItem()`    | Inserts a new equipment item with full validation |
| `getAllEquipmentItems()`   | Returns all items in the collection              |
| `getEquipmentById(id)`     | Fetches a single item by ObjectId                |
| `updateEquipmentLocation()`| Updates an item's storage location               |
| `removeEquipmentItem(id)`  | Deletes an item by ObjectId                      |

- **Database:** `Samantha_Bryan_lab4`
- **Collection:** `equipment`

### Lab 5 — Express REST API

A simple Express server exposing a REST API over a MongoDB bands collection.

| Route           | Description                              |
| --------------- | ---------------------------------------- |
| `GET /bands`    | Returns all 20 bands as a JSON array     |
| `GET /bands/:id`| Returns a single band by its ObjectId    |

Error handling:
- `400` — id is a number or an invalid ObjectId
- `404` — no band found with the given id

- **Database:** `Samantha_Bryan_lab5`
- **Collection:** `bands`
- **Server:** `http://localhost:3000`

## Tech Stack

- **Runtime:** Node.js (v18+)
- **Module system:** ES6 (`import`/`export`)
- **Async pattern:** `async`/`await` throughout
- **Database:** MongoDB (labs 4 & 5)
- **Server:** Express (lab 5)
- **Testing:** Jest (`*.test.mjs`)

## Running the Labs

```bash
# Lab 3
cd lab3/
node app.js

# Lab 4
cd lab4/
npm start

# Lab 5
cd lab5/
npm run seed   # seed the database first
npm start      # runs on http://localhost:3000

# Run tests (Lab 1)
cd lab1/
node --experimental-vm-modules node_modules/.bin/jest
```

## Concepts Demonstrated

- ES6 module system (`import`/`export`, `.mjs` files)
- Async/await and Promise-based data fetching
- Defensive input validation with descriptive error messages
- Separation of concerns across multiple data modules
- MongoDB CRUD operations with the Node.js driver
- Express routing and JSON REST APIs
- Unit testing with Jest
